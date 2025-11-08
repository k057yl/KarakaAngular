import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HeaderComponent, RouterModule],
  template: `
    <div class="layout">
      <app-header></app-header>

      <div class="main">
        <section class="content" (click)="hidePanel()">
          <router-outlet></router-outlet>
        </section>
      </div>

      <footer class="footer">Футер</footer>
    </div>
  `,
  styles: [`
    :host { display: block; height: 100vh; overflow: hidden; }

    .layout { display: flex; flex-direction: column; height: 100%; }
    .main { position: relative; flex: 1; overflow: hidden; }

    .menu-btn {
      position: absolute;
      top: 10px;
      left: 10px;
      z-index: 1100;
      background: #333;
      color: #fff;
      border: none;
      border-radius: 4px;
      padding: 6px 10px;
      cursor: pointer;
    }

    .content {
      background: var(--bg);
      padding: 1rem;
      height: 100%;
      overflow-y: auto;
      transition: filter 0.3s ease;
      padding-top: 80px;
      box-sizing: border-box;
    }

    /* Скролл для Chrome, Edge, Opera */
    .content::-webkit-scrollbar {
      width: 8px;
    }

    .content::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.05);
    }

    .content::-webkit-scrollbar-thumb {
      background: var(--botton-bg);
      border-radius: 4px;
      transition: background 0.2s ease;
    }

    /* Скролл для Firefox */
    .content {
      scrollbar-width: thin;
      scrollbar-color: var(--botton-bg) rgba(255, 255, 255, 0.05);
    }

    .content::-webkit-scrollbar-thumb:hover {
      background: var(--botton-bg-hover);
    }

    .footer {
      height: 60px;
      background: var(--bg);
      text-align: center;
      line-height: 60px;
    }
  `]
})
export class AppComponent {
  isPanelVisible = false;

  togglePanel() {
    this.isPanelVisible = !this.isPanelVisible;
  }

  hidePanel() {
    if (this.isPanelVisible) this.isPanelVisible = false;
  }
}