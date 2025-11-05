import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { LeftPanelComponent } from './panels/left.panel.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HeaderComponent, LeftPanelComponent, RouterModule],
  template: `
    <div class="layout">
      <app-header></app-header>

      <div class="main">
        <button class="menu-btn" (click)="togglePanel()">☰</button>

        <app-left-panel
          class="left-panel"
          [class.visible]="isPanelVisible"
          (click)="hidePanel()">
        </app-left-panel>

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

    .left-panel {
      position: fixed;
      top: 80px; /* высота хедера */
      left: -260px;
      width: 260px;
      height: calc(100% - 80px);
      color: white;
      transition: left 0.3s ease;
      z-index: 1000;
      overflow-y: auto;
    }

    .left-panel.visible {
      left: 0;
    }

    .content {
      background: var(--bg);
      padding: 1rem;
      height: 100%;
      overflow-y: auto;
      transition: filter 0.3s ease;
      padding-top: 80px; /* добавлен отступ под хедер */
      box-sizing: border-box;
    }

    .footer {
      height: 60px;
      background: var(--bg);
      text-align: center;
      line-height: 60px;
    }

    .left-panel.visible ~ .content {
      filter: blur(2px);
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