// Page-entry text reveal, after ehsandesigns.com: each text block rises 10px out of a
// 5px blur, staggered by 42ms (capped at the sixth), once per page view.
const REVEAL_TARGETS = [
  'h1:not(.visually-hidden)',
  'h2:not(.visually-hidden)',
  'h3',
  '[role="heading"]',
  '.bio',
  '.contact > p',
  '.social-links',
  '.narrative > p',
  '.summary',
  '.collection-summary',
  '.project-body',
  '.article-intro',
  '.article-subtitle',
  '.article-role',
  '.article-section > p',
  '.achievements',
  '.recent-item',
].join(', ');

const PRELOADER_DONE = 'portfolio:intro-done';

export function revealText(root: HTMLElement): void {
  if (typeof window.matchMedia !== 'function' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const run = () => {
    root.querySelectorAll<HTMLElement>(REVEAL_TARGETS).forEach((element, index) => {
      if (typeof element.animate !== 'function' || !element.getClientRects().length) {
        return;
      }
      element.classList.add('text-reveal');
      element
        .animate(
          [
            { opacity: 0, transform: 'translateY(10px)', filter: 'blur(5px)' },
            { opacity: 1, transform: 'translateY(0)', filter: 'blur(0px)' },
          ],
          {
            duration: 560,
            delay: Math.min(index, 5) * 42,
            easing: 'cubic-bezier(.16, 1, .3, 1)',
            fill: 'backwards',
          },
        )
        .finished.then(
          () => element.classList.remove('text-reveal'),
          () => element.classList.remove('text-reveal'),
        );
    });
  };

  // Hold the reveal until the first-visit preloader starts fading out.
  const preloader = document.getElementById('site-preloader');
  if (preloader && !preloader.hidden && preloader.dataset['phase'] !== 'exit') {
    window.addEventListener(PRELOADER_DONE, run, { once: true });
  } else {
    run();
  }
}
