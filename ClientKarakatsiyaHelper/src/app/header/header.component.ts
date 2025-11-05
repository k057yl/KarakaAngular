import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderAuthPanelComponent } from './header.auth.panel.component';
import { HeaderControlsComponent } from './header.controls.component';
import { TranslateService } from '../services/translate.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderAuthPanelComponent, HeaderControlsComponent],
  template: `
    <header class="header">
      <div class="logo">
        <a routerLink="/"><img src="assets/images/Logo1.png" alt="Logo" /></a>
      </div>

      <span class="title">{{ translate.t('HEADER.TAGLINE') }}</span>

      <div class="header-right">
        <app-header-auth-panel></app-header-auth-panel>
        <app-header-controls></app-header-controls>
      </div>
    </header>
  `,
  styles: [`
    .header {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 60px;
      padding: 0 20px;
      background-color: var(--main-bg);
      color: var(--main-text);
      position: relative;
    }

    .logo {
      position: absolute;
      left: 20px;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .logo img {
      height: 40px;
      object-fit: contain;
    }

    .header-right {
      position: absolute;
      right: 20px;
      display: flex;
      align-items: center;
      gap: 15px;
    }

    .title {
      font-size: 28px;
      font-weight: 600;
      text-align: center;
    }
  `]
})
export class HeaderComponent {
  constructor(public translate: TranslateService) {}
}