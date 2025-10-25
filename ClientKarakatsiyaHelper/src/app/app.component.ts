import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HeaderComponent, RouterModule],
  template: `
    <div class="header">
      <app-header></app-header>
    </div>
    <div class="content">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      height: 100vh;
    }

    .header {
      height: 200px;
      width: 100%;
    }
    app-header {
      flex: 0 0 auto;
    }

    .content {
      flex: 1 1 auto;
      overflow-y: auto;
      padding: 1rem;
      background: #328611ff;
    }
  `]
})
export class AppComponent {}