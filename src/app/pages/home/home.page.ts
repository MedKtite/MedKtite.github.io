import { Component, afterNextRender, inject, signal } from '@angular/core';
import { LanguageService } from '../../core/services/language.service';
import { FOLDERS, HOME_LINKS, PROFILE, PROJECT_STATUS, RECENT_WORK, RecentWork, UI } from '../../core/data/portfolio';

@Component({
  selector: 'app-home-page',
  standalone: false,
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
})
export class HomePage {
  readonly i18n = inject(LanguageService);
  readonly profile = PROFILE;
  readonly links = HOME_LINKS;
  readonly folders = FOLDERS;
  readonly recentWork = RECENT_WORK;
  readonly status = PROJECT_STATUS;
  readonly ui = UI;

  // Android visitors get the Google Play listing; decided after hydration so the
  // prerendered markup (App Store) and the first client render agree.
  private readonly onAndroid = signal(false);

  constructor() {
    afterNextRender(() => this.onAndroid.set(/android/i.test(navigator.userAgent)));
  }

  rowHref(item: RecentWork): string {
    return this.onAndroid() && item.androidHref ? item.androidHref : item.href;
  }
}
