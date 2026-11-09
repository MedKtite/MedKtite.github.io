import { Component, ElementRef, PLATFORM_ID, ViewChild, afterNextRender, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { revealText } from './core/motion/text-reveal';
import { SoundService } from './core/services/sound.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss',
})
export class App {
  private readonly router = inject(Router);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  @ViewChild('main', { static: true }) private main?: ElementRef<HTMLElement>;

  constructor() {
    // Click sound and ring, after the reference site.
    const sound = inject(SoundService);
    afterNextRender(() => sound.listen());
  }

  // Home shows the location and folder navigation; every other page gets a back link.
  readonly isHome = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event) => event.urlAfterRedirects.split(/[?#]/)[0] === '/'),
    ),
    { initialValue: true },
  );

  // Back goes one level up: an article returns to Case Studies, everything else to Home.
  readonly backLink = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event) => (event.urlAfterRedirects.startsWith('/case-studies/') ? '/case-studies' : '/')),
    ),
    { initialValue: '/' },
  );

  // Each routed page fades its text in once it is on screen.
  onPageActivate(): void {
    const main = this.main?.nativeElement;
    if (this.isBrowser && main) {
      requestAnimationFrame(() => revealText(main));
    }
  }
}
