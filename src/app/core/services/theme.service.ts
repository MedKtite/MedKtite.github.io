import { Injectable, Inject, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type Theme = 'dark' | 'light';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly THEME_KEY = 'portfolio_theme';
  readonly currentTheme = signal<Theme>('dark');
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
    if (this.isBrowser) {
      this.initTheme();
    }
  }

  private initTheme(): void {
    try {
      const savedTheme = localStorage.getItem(this.THEME_KEY) as Theme | null;
      if (savedTheme === 'light' || savedTheme === 'dark') {
        this.setTheme(savedTheme);
      } else if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        this.setTheme(prefersDark ? 'dark' : 'dark');
      } else {
        this.setTheme('dark');
      }
    } catch {
      this.setTheme('dark');
    }
  }

  setTheme(theme: Theme): void {
    this.currentTheme.set(theme);
    if (this.isBrowser) {
      try {
        localStorage.setItem(this.THEME_KEY, theme);
      } catch {
        // Ignore localStorage errors (e.g. disabled cookies/storage)
      }

      if (theme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
      } else {
        document.documentElement.removeAttribute('data-theme');
      }
    }
  }

  toggleTheme(): void {
    const nextTheme: Theme = this.currentTheme() === 'dark' ? 'light' : 'dark';
    this.setTheme(nextTheme);
  }

  isDark(): boolean {
    return this.currentTheme() === 'dark';
  }
}
