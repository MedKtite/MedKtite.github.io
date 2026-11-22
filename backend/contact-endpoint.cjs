const express = require('express');

/**
 * Mount with app.use('/api/contact', createContactEndpoint({ recipient, sendMail })).
 * sendMail receives { to, replyTo, subject, text } and must reject on delivery failure.
 * Configure the sender address in your mail transport.
 */
module.exports = function createContactEndpoint({
  recipient,
  sendMail,
  allowedOrigin = 'https://ktite.me',
}) {
  const endpoint = express.Router();
  const attempts = new Map();
  const windowMs = 15 * 60 * 1000;
  let resetAt = Date.now() + windowMs;

  endpoint.use((req, res, next) => {
    res.vary('Origin');
    res.set('Cache-Control', 'no-store');
    const origin = req.get('Origin');
    if (origin && origin !== allowedOrigin) {
      return res.status(403).json({ error: 'Origin is not allowed.' });
    }
    if (origin) {
      res.set('Access-Control-Allow-Origin', allowedOrigin);
      res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
      res.set('Access-Control-Allow-Headers', 'Content-Type');
    }
    next();
  });

  endpoint.options('/', (_req, res) => res.sendStatus(204));

  endpoint.post('/', (req, res, next) => {
    const now = Date.now();
    if (now >= resetAt) {
      attempts.clear();
      resetAt = now + windowMs;
    }

    const count = attempts.get(req.ip) ?? 0;
    if (count >= 5 || (!attempts.has(req.ip) && attempts.size >= 1000)) {
      res.set('Retry-After', String(Math.ceil((resetAt - now) / 1000)));
      return res.status(429).json({ error: 'Too many requests. Try again later.' });
    }
    attempts.set(req.ip, count + 1);

    if (!req.is('application/json')) {
      return res.status(415).json({ error: 'Expected application/json.' });
    }
    next();
  }, express.json({ limit: '16kb' }), async (req, res) => {
    const field = (key) => typeof req.body?.[key] === 'string' ? req.body[key].trim() : '';
    const name = field('name');
    const email = field('email');
    const subject = field('subject') || 'Hello from your portfolio';
    const message = field('message');

    if (!name || name.length > 100 ||
        email.length > 254 || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email) ||
        subject.length > 150 || /[\r\n]/.test(subject) ||
        !message || message.length > 4000) {
      return res.status(400).json({ error: 'Check your name, email, subject, and message.' });
    }

    try {
      await sendMail({
        to: recipient,
        replyTo: { address: email },
        subject,
        text: `From: ${name} <${email}>\n\n${message}`,
      });
      return res.status(200).json({ ok: true });
    } catch {
      return res.status(502).json({ error: 'Could not send your message. Try again later.' });
    }
  });

  endpoint.use((error, _req, res, next) => {
    if (error.type === 'entity.too.large') {
      return res.status(413).json({ error: 'Message is too large.' });
    }
    if (error.type === 'entity.parse.failed') {
      return res.status(400).json({ error: 'Invalid JSON.' });
    }
    next(error);
  });

  return endpoint;
};
