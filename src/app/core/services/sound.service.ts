import { Injectable, Inject, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

type ClickVoice = (options?: { volume?: number; pan?: number }) => void;

// Click feedback after ehsandesigns.com: a soft synthesized "tap" on every click,
// plus a ring that expands from the pointer. Nothing is downloaded; the sound is
// built with the Web Audio API.
@Injectable({
  providedIn: 'root',
})
export class SoundService {
  private readonly SOUND_KEY = 'portfolio_sound';
  readonly enabled = signal(true);
  private isBrowser: boolean;
  private listening = false;

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
    if (this.isBrowser) {
      try {
        this.enabled.set(localStorage.getItem(this.SOUND_KEY) !== 'off');
      } catch {
        // Ignore localStorage errors (e.g. disabled cookies/storage)
      }
    }
  }

  setEnabled(on: boolean): void {
    this.enabled.set(on);
    if (this.isBrowser) {
      try {
        localStorage.setItem(this.SOUND_KEY, on ? 'on' : 'off');
      } catch {
        // Ignore localStorage errors
      }
    }
  }

  toggle(): void {
    this.setEnabled(!this.enabled());
  }

  // Called once from the app shell, in the browser only.
  listen(): void {
    if (!this.isBrowser || this.listening) {
      return;
    }
    this.listening = true;
    const play = createClickVoice();
    const reducedMotion =
      typeof window.matchMedia === 'function' ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;

    document.addEventListener('click', (event) => {
      if (!event.isTrusted || event.button !== 0) {
        return;
      }
      if (this.enabled()) {
        play();
      }
      // detail is 0 for keyboard-triggered clicks, which have no pointer position.
      if (!reducedMotion?.matches && event.detail > 0) {
        spawnClickRing(event.clientX, event.clientY);
      }
    });
  }
}

function createClickVoice(): ClickVoice {
  const Context: typeof AudioContext | undefined =
    window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  let context: AudioContext | undefined;
  let output: DynamicsCompressorNode;
  let noise: AudioBuffer;
  let resuming = false;
  let lastPlayed = -Infinity;

  const ensureContext = (): AudioContext | null => {
    if (context && context.state !== 'closed') {
      return context;
    }
    if (!Context) {
      return null;
    }
    context = new Context();
    output = context.createDynamicsCompressor();
    output.threshold.value = -18;
    output.ratio.value = 6;
    output.connect(context.destination);
    noise = context.createBuffer(1, Math.floor(context.sampleRate * 0.03), context.sampleRate);
    const samples = noise.getChannelData(0);
    for (let i = 0; i < samples.length; i++) {
      samples[i] = Math.random() * 2 - 1;
    }
    lastPlayed = -Infinity;
    return context;
  };

  const play: ClickVoice = ({ volume = 1, pan = 0 } = {}) => {
    try {
      const ctx = ensureContext();
      if (!ctx) {
        return;
      }
      // Browsers start audio suspended until the first interaction; resume, then play.
      if (ctx.state === 'suspended' || (ctx.state as string) === 'interrupted') {
        if (resuming) {
          return;
        }
        resuming = true;
        ctx.resume().then(
          () => {
            resuming = false;
            if (ctx.state === 'running') {
              play({ volume, pan });
            }
          },
          () => {
            resuming = false;
          },
        );
        return;
      }
      // At most one click every 30ms, so rapid clicking never stacks up.
      if (ctx.state !== 'running' || ctx.currentTime - lastPlayed < 0.03 || volume <= 0) {
        return;
      }
      const now = ctx.currentTime;
      lastPlayed = now;
      const detune = 1 + (Math.random() - 0.5) * 0.12;

      const panner = ctx.createStereoPanner();
      panner.pan.value = Math.max(-0.8, Math.min(0.8, pan));
      panner.connect(output);

      // Body: a quiet sine gliding 140 → 95 Hz. The 10ms attack rounds off the
      // front edge so it lands as a muffled tap rather than a click.
      const tone = ctx.createOscillator();
      tone.type = 'sine';
      tone.frequency.setValueAtTime(140 * detune, now);
      tone.frequency.exponentialRampToValueAtTime(95 * detune, now + 0.05);
      const toneGain = ctx.createGain();
      toneGain.gain.setValueAtTime(0.0001, now);
      toneGain.gain.exponentialRampToValueAtTime(0.16 * volume, now + 0.01);
      toneGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);
      tone.connect(toneGain).connect(panner);

      // Texture: a breath of darkly filtered noise, barely above the tone.
      const tick = ctx.createBufferSource();
      tick.buffer = noise;
      tick.playbackRate.value = detune;
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 650 * detune;
      filter.Q.value = 0.5;
      const tickGain = ctx.createGain();
      tickGain.gain.setValueAtTime(0.025 * volume, now);
      tickGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.02);
      tick.connect(filter).connect(tickGain).connect(panner);

      tone.onended = () => {
        for (const node of [tone, toneGain, tick, filter, tickGain, panner]) {
          node.disconnect();
        }
      };
      tone.start(now);
      tone.stop(now + 0.1);
      tick.start(now);
    } catch {
      // Audio is a nicety; never let it break a click.
    }
  };

  return play;
}

function spawnClickRing(x: number, y: number): void {
  const ring = document.createElement('span');
  ring.className = 'click-ring';
  ring.setAttribute('aria-hidden', 'true');
  ring.style.left = `${x}px`;
  ring.style.top = `${y}px`;
  document.body.append(ring);
  if (typeof ring.animate !== 'function') {
    ring.remove();
    return;
  }
  ring
    .animate(
      [
        { transform: 'translate(-50%, -50%) scale(.45)', opacity: 0.65 },
        { transform: 'translate(-50%, -50%) scale(1.8)', opacity: 0 },
      ],
      { duration: 480, easing: 'cubic-bezier(.16, 1, .3, 1)' },
    )
    .finished.then(
      () => ring.remove(),
      () => ring.remove(),
    );
}
