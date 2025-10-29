import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-left-panel',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="left-panel">
      <button routerLink="/item-create">Создать объект</button>
      <button routerLink="/item-list">Посмотреть объекты</button>
      <button routerLink="/sale-list">Продажи</button>
    </div>
  `,
  styles: [`
    .left-panel {
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding: 1rem;
      background: var(--panel-bg);
    }

    button {
      padding: 8px 12px;
      border: none;
      border-radius: 4px;
      background: #0bf003;
      color: #000;
      font-weight: bold;
      cursor: pointer;
    }

    button:hover {
      background: #09c002;
    }
  `]
})
export class LeftPanelComponent {}