import { Component, Input, inject } from '@angular/core';
import { LanguageService } from '../../core/services/language.service';
import { FOOTER_LINKS, PROFILE } from '../../core/data/portfolio';

@Component({
  selector: 'app-site-footer',
  standalone: false,
  templateUrl: './site-footer.component.html',
  styleUrl: './site-footer.component.scss',
})
export class SiteFooterComponent {
  @Input() isHome = true;

  readonly i18n = inject(LanguageService);
  readonly profile = PROFILE;
  readonly links = FOOTER_LINKS;
  readonly year = 2026;
}
