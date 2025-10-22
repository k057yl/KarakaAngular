import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderAuthPanelComponent } from './header.auth.panel.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderAuthPanelComponent],
  template: `
    <div class="header">
      <div class="logo"><div>
      <nav>
        <button routerLink="/item-create">Создать объект</button>
        <button routerLink="/item-list">Посмотреть объекты</button>
      </nav>
      <app-header-auth-panel></app-header-auth-panel>
    </div>
  `,
  styles: [`
    .header {
      background: #a10d0dff;
      color: #0bf003ff;
    }

    .logo {
      width: 200px;
      height: 160px;
      background: #1c04f733;
    }
  `]
})
export class HeaderComponent {}