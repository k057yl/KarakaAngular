import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { LeftPanelComponent } from './panels/left.panel.component';
import { RightPanelComponent } from './panels/right.panel.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HeaderComponent, LeftPanelComponent, RightPanelComponent, RouterModule],
  template: `
    <div class="layout">
      <app-header></app-header>

      <div class="main">
        <app-left-panel></app-left-panel>

        <section class="content">
          <router-outlet></router-outlet>
        </section>

        <app-right-panel></app-right-panel>
      </div>

      <footer class="footer">Футер</footer>
    </div>
  `,
  styles: [`
    :host { display: block; height: 100vh; overflow: hidden; }

    .layout { display: flex; flex-direction: column; height: 100%; }

    .main {
      flex: 1;
      display: grid;
      grid-template-columns: 260px 1fr 260px;
      grid-template-rows: 1fr;
      overflow: hidden;
    }

    .content {
      background: var(--bg);
      padding: 1rem;
      overflow-y: auto;
    }

    .footer {
      height: 60px;
      background: var(--panel-bg);
      text-align: center;
      line-height: 60px;
    }
  `]
})
export class AppComponent {}