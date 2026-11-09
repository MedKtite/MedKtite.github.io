import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LanguageService } from '../../core/services/language.service';
import { CASE_ARTICLES, CaseArticle, UI } from '../../core/data/portfolio';

@Component({
  selector: 'app-case-article-page',
  standalone: false,
  templateUrl: './case-article.page.html',
  styleUrl: './case-article.page.scss',
})
export class CaseArticlePage {
  readonly i18n = inject(LanguageService);
  readonly article: CaseArticle;
  readonly ui = UI;

  constructor() {
    const slug = inject(ActivatedRoute).snapshot.data['slug'];
    this.article = CASE_ARTICLES.find((item) => item.slug === slug) ?? CASE_ARTICLES[0];
  }
}
