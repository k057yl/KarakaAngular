import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateService } from '../services/translate.service';

@Component({
  selector: 'app-left-panel',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="left-panel">
      <button routerLink="/item-create">{{ t('LEFT_PANEL.BOTTON_CREATE') }}</button>
      <button routerLink="/item-list">{{ t('LEFT_PANEL.BOTTON_SHOW_ITEMS') }}</button>
      <button routerLink="/sale-list">{{ t('LEFT_PANEL.BOTTON_SHOW_SALES') }}</button>
    </div>
  `,
  styles: [`
    .left-panel {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      padding: 1rem;
      height: 100%;
      background: var(--left-panel-bg);
      box-sizing: border-box;
    }

    button {
      width: 70%;
      padding: 10px 14px;
      border: none;
      border-radius: 4px;
      background: var(--botton-bg);
      color: var(--botton-text);
      font-weight: bold;
      cursor: pointer;
    }

    button:hover {
      background: var(--botton-bg-hover);
      color: var(--botton-text-hover);
    }
  `]
})
export class LeftPanelComponent {
  constructor(private translate: TranslateService) {}

  t(key: string) {
    return this.translate.t(key);
  }
}