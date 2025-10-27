import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderAuthPanelComponent } from './header.auth.panel.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderAuthPanelComponent],
  template: `
    <header class="header">
      <div class="logo">LOGO</div>

      <nav class="nav">
        <button routerLink="/item-create">Создать объект</button>
        <button routerLink="/item-list">Посмотреть объекты</button>
        <button routerLink="/sale-list">Посмотреть продажи</button>
      </nav>

      <div class="auth">
        <app-header-auth-panel></app-header-auth-panel>
      </div>
    </header>
  `,
  styles: [`
    .header {
      display: grid;
      grid-template-columns: 260px 1fr 260px;
      align-items: center;
      background: #a10d0d;
      color: #0bf003;
      width: 100%;
      height: 200px;
      margin: 0;
      box-sizing: border-box;
      overflow-x: hidden;
    }

    .logo {
      background: #1c04f733;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      color: #fff;
      border-radius: 6px;
    }

    .nav {
      display: flex;
      justify-content: center;
      gap: 20px;
    }

    .nav button {
      background: #333;
      color: #fff;
      border: none;
      padding: 8px 14px;
      border-radius: 6px;
      cursor: pointer;
      transition: background 0.2s ease;
    }

    .nav button:hover {
      background: #555;
    }

    .auth {
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }

    :host {
      display: block;
      width: 100%;
    }
  `]
})
export class HeaderComponent {}