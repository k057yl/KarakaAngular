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
      <header class="header">
        <app-header></app-header>
      </header>

      <div class="main">
        <aside class="left-panel">Левая панель</aside>

        <section class="content">
          <router-outlet></router-outlet>
        </section>

        <aside class="right-panel">Правая панель</aside>
      </div>

      <footer class="footer">Футер</footer>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      height: 100vh;
      overflow: hidden;
    }

    .layout {
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .header {
      height: 200px;
      background: #222;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .main {
      flex: 1;
      display: grid;
      grid-template-columns: 260px 1fr 260px;
      grid-template-rows: 1fr;
      overflow: hidden;
    }

    .left-panel,
    .right-panel {
      background: #2e2e2e;
      color: #ccc;
      padding: 1rem;
      overflow-y: auto;
    }

    .content {
      background: #328611;
      padding: 1rem;
      overflow-y: auto;
    }

    .footer {
      height: 60px;
      background: #111;
      color: white;
      text-align: center;
      line-height: 60px;
      flex-shrink: 0;
    }
  `]
})
export class AppComponent {}