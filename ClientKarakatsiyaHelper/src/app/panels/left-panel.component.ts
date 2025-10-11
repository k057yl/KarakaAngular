import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-left-panel',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="panel">
      <h3>Левая панель</h3>
      <div class="button"><a routerLink="/create-item">Create Item</a></div>
    </div>
  `,
  styles: [`
    .panel {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 10px;
      width: 200px;
      background: #2703f0ff;
      color: #fff;
      gap: 10px;
    }

    .create-btn {
      background: #fff;
      color: #2703f0ff;
      border: none;
      padding: 6px 10px;
      border-radius: 4px;
      cursor: pointer;
      transition: background 0.2s ease;
    }

    .create-btn:hover {
      background: #cfcfff;
    }
  `]
})
export class LeftPanelComponent {}