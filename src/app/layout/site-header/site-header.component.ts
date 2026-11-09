import { Component, DestroyRef, Input, afterNextRender, inject, signal } from '@angular/core';
import { LanguageService } from '../../core/services/language.service';
import { ThemeService } from '../../core/services/theme.service';
import { SoundService } from '../../core/services/sound.service';
import { Lang, PROFILE, UI } from '../../core/data/portfolio';

@Component({
  selector: 'app-site-header',
  standalone: false,
  templateUrl: './site-header.component.html',
  styleUrl: './site-header.component.scss',
})
export class SiteHeaderComponent {
  @Input() isHome = true;
  @Input() backLink = '/';

  readonly i18n = inject(LanguageService);
  readonly theme = inject(ThemeService);
  readonly sound = inject(SoundService);
  readonly profile = PROFILE;
  readonly ui = UI;
  readonly languages: Lang[] = ['en', 'fr'];

  // Rendered only in the browser so prerendered HTML and hydration agree.
  readonly clock = signal('');

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const format = new Intl.DateTimeFormat('en-GB', {
        timeZone: PROFILE.timeZone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      });
      const update = () => this.clock.set(format.format(new Date()));
      update();
      const timer = setInterval(update, 1000);
      destroyRef.onDestroy(() => clearInterval(timer));
    });
  }
}
