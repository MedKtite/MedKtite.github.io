import { Component, inject } from '@angular/core';
import { LanguageService } from '../../core/services/language.service';
import { EXPERIENCE, UI } from '../../core/data/portfolio';

@Component({
  selector: 'app-experience-page',
  standalone: false,
  templateUrl: './experience.page.html',
  styleUrl: './experience.page.scss',
})
export class ExperiencePage {
  readonly i18n = inject(LanguageService);
  readonly experience = EXPERIENCE;
  readonly ui = UI;
}
