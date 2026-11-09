import { Component, inject } from '@angular/core';
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

  // The site is static, so the form hands the message to the visitor's email app.
  sendMessage(event: SubmitEvent): void {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    if (!form.reportValidity()) {
      return;
    }
    const data = new FormData(form);
    const field = (name: string) => String(data.get(name) ?? '').trim();
    const subject = field('subject') || this.i18n.t(this.ui.contactDefaultSubject);
    const body = `${field('message')}\n\n${field('name')}\n${field('email')}`;
    window.location.href =
      `mailto:${this.profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }
}
