import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { vi } from 'vitest';
import { AppModule } from './app-module';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should greet on the home page and offer four folders', async () => {
    const fixture = TestBed.createComponent(App);
    await TestBed.inject(Router).navigateByUrl('/');
    await fixture.whenStable();
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Mohammed');
    expect(compiled.querySelectorAll('.folder-button').length).toBe(4);
    const rows = compiled.querySelectorAll<HTMLAnchorElement>('.recent-row');
    expect(rows.length).toBe(3);
    expect(rows[0].getAttribute('href')).toContain('apps.apple.com');
    expect(rows[1].getAttribute('href')).toBe('https://beta.maconformite.ma/');
  });

  it('should show a back link on inner pages', async () => {
    const fixture = TestBed.createComponent(App);
    await TestBed.inject(Router).navigateByUrl('/experience');
    await fixture.whenStable();
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.back-link')).not.toBeNull();
    expect(compiled.querySelectorAll('.timeline-entry').length).toBe(3);
    expect(compiled.querySelectorAll('.project-title').length).toBe(5);
  });

  it('should show every project as a card on the work page', async () => {
    const fixture = TestBed.createComponent(App);
    await TestBed.inject(Router).navigateByUrl('/work');
    await fixture.whenStable();
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('.project').length).toBe(9);
    expect(compiled.querySelectorAll('.status[data-status="live"]').length).toBe(5);
  });

    it('should open the MaConformite case study with a back link to case studies', async () => {
    const fixture = TestBed.createComponent(App);
    await TestBed.inject(Router).navigateByUrl('/case-studies/maconformite');
    await fixture.whenStable();
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('MaConformite.ma');
    expect(compiled.querySelectorAll('.article-section').length).toBe(9);
    expect(compiled.querySelectorAll('.article-figure').length).toBe(7);
    expect(compiled.querySelectorAll('.article-figure figcaption').length).toBe(6);
    expect(compiled.querySelector('.figure-crop img')).not.toBeNull();
    expect(compiled.querySelector('.back-link')?.getAttribute('href')).toBe('/case-studies');
  });

    it('should open the Analytix case study with paired phone screens', async () => {
    const fixture = TestBed.createComponent(App);
    await TestBed.inject(Router).navigateByUrl('/case-studies/analytix-mobile');
    await fixture.whenStable();
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Analytix Mobile');
    expect(compiled.querySelectorAll('.screen-pair').length).toBe(3);
    expect(compiled.querySelectorAll('.screen').length).toBe(6);
    expect(compiled.querySelector('.article-link')?.getAttribute('href')).toContain('apps.apple.com');
  });

  it('should list credentials, technologies and a contact form on the about page', async () => {
    const fixture = TestBed.createComponent(App);
    await TestBed.inject(Router).navigateByUrl('/about');
    await fixture.whenStable();
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const panels = compiled.querySelectorAll('.credential-list');
    expect(panels.length).toBe(2);
    expect(panels[0].querySelectorAll('.credential').length).toBe(2);
    expect(panels[0].textContent).toContain('ENSET Mohammedia');
    expect(panels[1].querySelectorAll('.credential').length).toBe(6);
    expect(compiled.querySelectorAll('.tech').length).toBe(14);
    expect(compiled.querySelectorAll('.contact-form [required]').length).toBe(3);
  });

  it('should submit the contact form and keep the message available after a failed attempt', async () => {
    const fixture = TestBed.createComponent(App);
    await TestBed.inject(Router).navigateByUrl('/about');
    fixture.detectChanges();

    const form = fixture.nativeElement.querySelector('.contact-form') as HTMLFormElement;
    const name = form.elements.namedItem('name') as HTMLInputElement;
    const email = form.elements.namedItem('email') as HTMLInputElement;
    const message = form.elements.namedItem('message') as HTMLTextAreaElement;
    const fetchMock = vi.spyOn(globalThis, 'fetch')
      .mockResolvedValueOnce(new Response(null, { status: 502 }))
      .mockResolvedValueOnce(Response.json({ ok: true }));

    try {
      name.value = 'Example Visitor';
      email.value = 'visitor@example.com';
      message.value = 'Hello from the portfolio.';
      form.requestSubmit();
      await fixture.whenStable();
      fixture.detectChanges();
      expect(form.querySelector('[role="status"]')?.textContent).toContain('Could not send');
      expect(message.value).toBe('Hello from the portfolio.');

      form.requestSubmit();
      await fixture.whenStable();
      fixture.detectChanges();
      expect(fetchMock).toHaveBeenLastCalledWith('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Example Visitor',
          email: 'visitor@example.com',
          subject: 'Hello from your portfolio',
          message: 'Hello from the portfolio.',
        }),
      });
      expect(form.querySelector('[role="status"]')?.textContent).toContain('Message sent.');
      expect(message.value).toBe('');
    } finally {
      fetchMock.mockRestore();
    }
  });
});
