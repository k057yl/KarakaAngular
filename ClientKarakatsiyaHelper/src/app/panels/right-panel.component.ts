import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-right-panel',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="panel">Правая панель</div>`,
  styles: [`
    .panel {
      width: 200px;
      background: #eee;
      height: 100%;
      padding: 10px;
      box-sizing: border-box;
    }
  `]
})
export class RightPanelComponent {}