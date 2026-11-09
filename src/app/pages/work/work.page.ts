import { Component, inject } from '@angular/core';
import { LanguageService } from '../../core/services/language.service';
import { PROJECTS, PROJECT_STATUS, Project, UI } from '../../core/data/portfolio';

@Component({
  selector: 'app-work-page',
  standalone: false,
  templateUrl: './work.page.html',
  styleUrl: './work.page.scss',
})
export class WorkPage {
  readonly i18n = inject(LanguageService);
  readonly projects = PROJECTS;
  readonly status = PROJECT_STATUS;
  readonly ui = UI;

  askHref(project: Project): string {
    return `mailto:ktite.m3@gmail.com?subject=${encodeURIComponent(project.name)}`;
  }
}
