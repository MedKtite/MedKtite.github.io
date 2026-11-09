import { Injectable, Inject, PLATFORM_ID, signal } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Lang, Localized } from '../data/portfolio';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private readonly LANG_KEY = 'portfolio_lang';
  readonly current = signal<Lang>('en');
  private isBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) platformId: object,
    @Inject(DOCUMENT) private document: Document,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    if (this.isBrowser) {
      try {
        const saved = localStorage.getItem(this.LANG_KEY);
        if (saved === 'en' || saved === 'fr') {
          this.setLang(saved);
        }
      } catch {
        // Ignore localStorage errors (e.g. disabled cookies/storage)
      }
    }
  }

  setLang(lang: Lang): void {
    this.current.set(lang);
    this.document.documentElement.lang = lang;
    if (this.isBrowser) {
      try {
        localStorage.setItem(this.LANG_KEY, lang);
      } catch {
        // Ignore localStorage errors
      }
    }
  }

  t(text: Localized): string {
    return text[this.current()];
  }
}
