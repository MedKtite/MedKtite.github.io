import { Component, Input, inject } from '@angular/core';
import { LanguageService } from '../../core/services/language.service';
import { FolderLink } from '../../core/data/portfolio';

// Resting spread of the thumbnails tucked in a folder, by how many it holds.
// Three-up values are the reference site's; one and two reuse its outer cards.
const SPREAD: Record<number, { offset: number; lift: number; angle: number }[]> = {
  1: [{ offset: 0, lift: -18, angle: -4 }],
  2: [
    { offset: -22, lift: -9, angle: -14 },
    { offset: 22, lift: -7, angle: 12 },
  ],
  3: [
    { offset: -22, lift: -9, angle: -14 },
    { offset: 0, lift: -18, angle: -2 },
    { offset: 22, lift: -7, angle: 12 },
  ],
};

@Component({
  selector: 'app-folder-link',
  standalone: false,
  templateUrl: './folder-link.component.html',
  styleUrl: './folder-link.component.scss',
})
export class FolderLinkComponent {
  @Input({ required: true }) folder!: FolderLink;

  readonly i18n = inject(LanguageService);

  thumbStyle(index: number, count: number): Record<string, string> {
    const spot = (SPREAD[count] ?? SPREAD[3])[index] ?? SPREAD[1][0];
    return {
      '--offset': `${spot.offset}px`,
      '--lift': `${spot.lift}px`,
      '--angle': `${spot.angle}deg`,
      'transition-delay': `${index * 35}ms`,
    };
  }
}
