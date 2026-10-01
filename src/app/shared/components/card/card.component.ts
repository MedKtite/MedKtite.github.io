import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

export type CardPadding = 'none' | 'sm' | 'md' | 'lg';
export type CardRadius = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() padding: CardPadding = 'md';
  @Input() radius: CardRadius = '2xl';
  @Input() hoverable: boolean = true;
  @Input() clickable: boolean = false;
  @Input() customClass: string = '';

  @Output() cardClick = new EventEmitter<MouseEvent>();

  onClick(event: MouseEvent): void {
    if (this.clickable) {
      this.cardClick.emit(event);
    }
  }
}
