import { Component, DestroyRef, ElementRef, Input, afterNextRender, inject } from '@angular/core';
import { LanguageService } from '../../core/services/language.service';
import { TimelineEntry } from '../../core/data/portfolio';

// Distance from an entry's top to the centre of its badge, where its dot sits.
const DOT_TOP = 22;

@Component({
  selector: 'app-timeline',
  standalone: false,
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss',
})
export class TimelineComponent {
  @Input({ required: true }) entries: TimelineEntry[] = [];
  @Input() headingLevel: 2 | 3 = 2;

  readonly i18n = inject(LanguageService);

  constructor() {
    const host = inject(ElementRef<HTMLElement>).nativeElement as HTMLElement;
    const destroyRef = inject(DestroyRef);

    // Scroll-driven progress along the rail, after the reference site's experience track:
    // a solid line and glowing cursor follow a line at 58% of the viewport, and each
    // entry's dot fills once passed and glows while the cursor is near.
    afterNextRender(() => {
      const track = host.querySelector<HTMLElement>('.track');
      const progress = host.querySelector<HTMLElement>('.track-progress');
      const cursor = host.querySelector<HTMLElement>('.track-cursor');
      const items = Array.from(host.querySelectorAll<HTMLElement>('.timeline-entry'));
      if (!track || !progress || !cursor || items.length === 0) {
        return;
      }

      let stops: number[] = [];
      let length = 0;
      let frame = 0;

      const measure = () => {
        const first = items[0].offsetTop;
        stops = items.map((item) => item.offsetTop - first);
        length = Math.max(stops[stops.length - 1], 1);
        track.style.top = `${first + DOT_TOP}px`;
        track.style.height = `${length}px`;
      };

      const paint = () => {
        frame = 0;
        const rect = track.getBoundingClientRect();
        const ratio = Math.min(Math.max((window.innerHeight * 0.58 - rect.top) / length, 0), 1);
        const reached = ratio * length;
        progress.style.transform = `scaleY(${ratio})`;
        cursor.style.transform = `translate3d(0, ${reached}px, 0)`;
        items.forEach((item, i) => {
          item.classList.toggle('is-passed', reached >= stops[i] - 1);
          item.classList.toggle('is-near', Math.abs(reached - stops[i]) < 24);
        });
      };

      const schedule = () => {
        if (!frame) {
          frame = requestAnimationFrame(paint);
        }
      };

      const remeasure = () => {
        measure();
        schedule();
      };
      // Images and font swaps change entry heights after first paint.
      const resize = typeof ResizeObserver === 'function' ? new ResizeObserver(remeasure) : null;
      resize?.observe(host);
      window.addEventListener('scroll', schedule, { passive: true });
      window.addEventListener('resize', remeasure);
      measure();
      paint();

      destroyRef.onDestroy(() => {
        cancelAnimationFrame(frame);
        resize?.disconnect();
        window.removeEventListener('scroll', schedule);
        window.removeEventListener('resize', remeasure);
      });
    });
  }
}
