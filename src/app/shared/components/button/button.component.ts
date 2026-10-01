import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'icon';
export type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'md';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;
  @Input() href?: string | null = null;
  @Input() target: string = '_self';
  @Input() download?: string | boolean | null = null;
  @Input() iconLeft?: string;
  @Input() iconRight?: string;
  @Input() ariaLabel?: string;
  @Input() fullWidth: boolean = false;
  @Input() label?: string;

  @Output() clicked = new EventEmitter<MouseEvent | Event>();

  onClick(event: MouseEvent | Event): void {
    if (this.disabled || this.loading) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    this.clicked.emit(event);
  }
}
