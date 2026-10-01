import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type BadgeVariant = 'default' | 'outline' | 'accent' | 'subtle';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss'],
})
export class BadgeComponent {
  @Input() label?: string;
  @Input() variant: BadgeVariant = 'default';
  @Input() icon?: string;
  @Input() interactive: boolean = false;
}
