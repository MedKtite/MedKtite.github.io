import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { App } from './app';
import { routes } from './app.routes';
import { SiteHeaderComponent } from './layout/site-header/site-header.component';
import { SiteFooterComponent } from './layout/site-footer/site-footer.component';
import { FolderLinkComponent } from './layout/folder-link/folder-link.component';
import { TimelineComponent } from './layout/timeline/timeline.component';
import { HomePage } from './pages/home/home.page';
import { WorkPage } from './pages/work/work.page';
import { ExperiencePage } from './pages/experience/experience.page';
import { CaseStudiesPage } from './pages/case-studies/case-studies.page';
import { AboutPage } from './pages/about/about.page';
import { CaseArticlePage } from './pages/case-article/case-article.page';

@NgModule({
  declarations: [
    App,
    SiteHeaderComponent,
    SiteFooterComponent,
    FolderLinkComponent,
    TimelineComponent,
    HomePage,
    WorkPage,
    ExperiencePage,
    CaseStudiesPage,
    AboutPage,
    CaseArticlePage,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, {
      enableViewTransitions: true,
      scrollPositionRestoration: 'top',
    }),
  ],
  providers: [provideBrowserGlobalErrorListeners(), provideClientHydration(withEventReplay())],
  bootstrap: [App],
})
export class AppModule {}
