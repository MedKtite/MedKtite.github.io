import { Injectable, Inject, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type Theme = 'dark' | 'light';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly THEME_KEY = 'portfolio_theme';
  readonly currentTheme = signal<Theme>('light');
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
    if (this.isBrowser) {
      this.initTheme();
    }
  }

  // index.html sets data-theme before first paint; this only syncs the signal with it.
  private initTheme(): void {
    const applied = document.documentElement.getAttribute('data-theme');
    if (applied === 'light' || applied === 'dark') {
      this.currentTheme.set(applied);
      return;
    }
    const prefersDark =
      typeof window.matchMedia === 'function' && window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.currentTheme.set(prefersDark ? 'dark' : 'light');
  }

  setTheme(theme: Theme): void {
    this.currentTheme.set(theme);
    if (this.isBrowser) {
      try {
        localStorage.setItem(this.THEME_KEY, theme);
      } catch {
        // Ignore localStorage errors (e.g. disabled cookies/storage)
      }
      document.documentElement.setAttribute('data-theme', theme);
    }
  }

  toggleTheme(): void {
    this.setTheme(this.currentTheme() === 'dark' ? 'light' : 'dark');
  }

  isDark(): boolean {
    return this.currentTheme() === 'dark';
  }
}
