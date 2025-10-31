import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderAuthPanelComponent } from './header.auth.panel.component';
import { ThemeService } from '../services/theme.service';
import { TranslateService } from '../services/translate.service';
import { Lang } from '../i18n';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderAuthPanelComponent],
  template: `
    <header class="header">
      <div class="logo">
        <a routerLink="/">LOGO</a>
      </div>

      <div>
        <p>Karakatsiya</p>
      </div>

      <div class="auth-theme-lang">
        <app-header-auth-panel></app-header-auth-panel>

        <!-- Кнопка смены темы -->
        <button class="btn toggle" (click)="toggleTheme()">
          {{ currentTheme === 'dark' ? '☀️ Light' : '🌙 Dark' }}
        </button>

        <!-- Кнопки смены языка -->
        <div class="lang-buttons">
          <button (click)="switchLang('ru')">RU</button>
          <button (click)="switchLang('en')">EN</button>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 60px;
      padding: 0 20px;
      background-color: var(--header-bg);
      color: #fff;
      box-sizing: border-box;
      gap: 20px;
    }

    .logo a { color: #fff; text-decoration: none; font-weight: bold; font-size: 1.2rem; }

    .auth-theme-lang {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .btn.toggle {
      background: #0bf003;
      color: #000;
      border: none;
      padding: 6px 12px;
      border-radius: 4px;
      cursor: pointer;
      font-weight: bold;
    }
    .btn.toggle:hover { background: #09c002; }

    .lang-buttons button {
      background: #333;
      color: #fff;
      border: none;
      padding: 6px 12px;
      border-radius: 6px;
      cursor: pointer;
      font-weight: bold;
      margin-left: 4px;
      transition: background 0.2s;
    }
    .lang-buttons button:hover { background: #555; }
  `]
})
export class HeaderComponent {
  currentTheme: 'dark' | 'light' = 'light';

  constructor(private theme: ThemeService, private translate: TranslateService) {
    this.theme.themeChanges().subscribe(t => {
      this.currentTheme = t;
      document.body.classList.toggle('dark-theme', t === 'dark');
    });
  }

  toggleTheme() {
    this.theme.toggle();
  }

  switchLang(lang: Lang) {
    this.translate.switchLang(lang);
  }
}