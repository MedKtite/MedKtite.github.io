import { Routes } from '@angular/router';
import { HomePage } from './pages/home/home.page';
import { WorkPage } from './pages/work/work.page';
import { ExperiencePage } from './pages/experience/experience.page';
import { CaseStudiesPage } from './pages/case-studies/case-studies.page';
import { AboutPage } from './pages/about/about.page';
import { CaseArticlePage } from './pages/case-article/case-article.page';

export const routes: Routes = [
  { path: '', component: HomePage, title: 'Mohammed Ktite' },
  { path: 'work', component: WorkPage, title: 'Selected Work · Mohammed Ktite' },
  { path: 'experience', component: ExperiencePage, title: 'Experience · Mohammed Ktite' },
  { path: 'case-studies', component: CaseStudiesPage, title: 'Case Studies · Mohammed Ktite' },
  {
    path: 'case-studies/maconformite',
    component: CaseArticlePage,
    data: { slug: 'maconformite' },
    title: 'MaConformite.ma case study · Mohammed Ktite',
  },
  {
    path: 'case-studies/analytix-mobile',
    component: CaseArticlePage,
    data: { slug: 'analytix-mobile' },
    title: 'Analytix Mobile case study · Mohammed Ktite',
  },
  { path: 'case-studies/ancora', component: CaseArticlePage, data: { slug: 'ancora' }, title: 'Ancora case study · Mohammed Ktite' },
  { path: 'about', component: AboutPage, title: 'About · Mohammed Ktite' },
  { path: '**', redirectTo: '' },
];
