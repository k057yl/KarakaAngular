import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-right-panel',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="panel">Правая панель</div>`,
  styles: [`
    .panel {
      flex: 1;
      width: 200px;
      background: #a8048dff;
      color: #000;
    }
  `]
})
export class RightPanelComponent {}