import { DOCUMENT } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { LanguageService } from '../../core/services/language.service';
import { ABOUT_INTRO, CERTIFICATIONS, EDUCATION, PROFILE, TECHNOLOGIES, UI } from '../../core/data/portfolio';

@Component({
  selector: 'app-about-page',
  standalone: false,
  templateUrl: './about.page.html',
  styleUrl: './about.page.scss',
})
export class AboutPage {
  readonly i18n = inject(LanguageService);
  readonly intro = ABOUT_INTRO;
  readonly education = EDUCATION;
  readonly certifications = CERTIFICATIONS;
  readonly technologies = TECHNOLOGIES;
  readonly profile = PROFILE;
  readonly ui = UI;

  private readonly document = inject(DOCUMENT);
  readonly contactStatus = signal<'idle' | 'sending' | 'sent' | 'error'>('idle');

  async sendMessage(event: SubmitEvent): Promise<void> {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    if (this.contactStatus() === 'sending' || !form.reportValidity()) {
      return;
    }

    const data = new FormData(form);
    const field = (name: string) => String(data.get(name) ?? '').trim();
    const endpoint =
      this.document.querySelector<HTMLMetaElement>('meta[name="contact-endpoint"]')?.content.trim() ||
      '/api/contact';

    this.contactStatus.set('sending');
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: field('name'),
          email: field('email'),
          subject: field('subject') || this.i18n.t(this.ui.contactDefaultSubject),
          message: field('message'),
        }),
      });
      const result = response.ok ? await response.json() : null;
      if (result?.ok !== true) {
        this.contactStatus.set('error');
        return;
      }

      form.reset();
      this.contactStatus.set('sent');
    } catch {
      this.contactStatus.set('error');
    }
  }
}
