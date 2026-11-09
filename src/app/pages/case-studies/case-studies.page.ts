import { Component, inject } from '@angular/core';
import { LanguageService } from '../../core/services/language.service';
import { CASE_STUDIES, UI } from '../../core/data/portfolio';

@Component({
  selector: 'app-case-studies-page',
  standalone: false,
  templateUrl: './case-studies.page.html',
  styleUrl: './case-studies.page.scss',
})
export class CaseStudiesPage {
  readonly i18n = inject(LanguageService);
  readonly studies = CASE_STUDIES;
  readonly ui = UI;
}
