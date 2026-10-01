import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-status-pill',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './status-pill.component.html',
  styleUrls: ['./status-pill.component.scss'],
})
export class StatusPillComponent {
  @Input() label: string = 'Open to work';
  @Input() status: 'available' | 'busy' | 'offline' = 'available';
}
