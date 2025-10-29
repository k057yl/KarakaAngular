import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-right-panel',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="right-panel">
      <!-- Здесь будет реклама или доп. контент -->
    </div>
  `,
  styles: [`
    .right-panel {
      padding: 1rem;
      background: var(--panel-bg);
    }
  `]
})
export class RightPanelComponent {}