import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderAuthPanelComponent } from './header.auth.panel.component';
import { ThemeService } from '../services/theme.service';

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

      <div class="auth-and-theme">
        <app-header-auth-panel></app-header-auth-panel>
        <button class="btn toggle" (click)="toggleTheme()">
          {{ currentTheme === 'dark' ? '☀️ Light' : '🌙 Dark' }}
        </button>
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

    .logo a {
      color: #fff;
      text-decoration: none;
      font-weight: bold;
      font-size: 1.2rem;
    }

    .nav {
      display: flex;
      justify-content: center;
      flex: 1;
      gap: 15px;
    }

    .nav button {
      background: #333;
      color: #fff;
      border: none;
      padding: 6px 12px;
      border-radius: 6px;
      cursor: pointer;
      transition: background 0.2s ease;
      font-weight: bold;
    }

    .nav button:hover {
      background: #555;
    }

    .auth-and-theme {
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

    .btn.toggle:hover {
      background: #09c002;
    }
  `]
})
export class HeaderComponent {
  currentTheme: 'dark' | 'light' = 'light';

  constructor(private theme: ThemeService) {
    this.theme.themeChanges().subscribe(t => {
      this.currentTheme = t;
      document.body.classList.toggle('dark-theme', t === 'dark');
    });
  }

  toggleTheme() {
    this.theme.toggle();
  }
}