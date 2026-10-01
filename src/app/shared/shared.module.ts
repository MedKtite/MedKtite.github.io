import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ButtonComponent,
  StatusPillComponent,
  BadgeComponent,
  CardComponent,
  SectionHeaderComponent,
  ThemeToggleComponent,
} from './components';

const SHARED_COMPONENTS = [
  ButtonComponent,
  StatusPillComponent,
  BadgeComponent,
  CardComponent,
  SectionHeaderComponent,
  ThemeToggleComponent,
];

@NgModule({
  imports: [CommonModule, ...SHARED_COMPONENTS],
  exports: [...SHARED_COMPONENTS],
})
export class SharedModule {}
