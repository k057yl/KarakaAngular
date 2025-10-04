import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LeftPanelComponent } from './panels/left-panel.component';
import { RightPanelComponent } from './panels/right-panel.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent, LeftPanelComponent, RightPanelComponent],
  template: `
    <app-header></app-header>
    <div class="main">
      <app-left-panel></app-left-panel>
      <div class="content">
        <router-outlet></router-outlet>
      </div>
      <app-right-panel></app-right-panel>
    </div>
    <app-footer></app-footer>
  `,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      height: 100vh;
      margin: 0;
    }
    .main {
      flex: 1;
      display: flex;
      overflow: hidden;
    }
    .content {
      flex: 1;
      overflow-y: auto;
      padding: 10px;
    }
  `]
})
export class AppComponent {}