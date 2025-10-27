import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header-auth-panel',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="auth-panel">
      <button routerLink="/register">Регистрация</button>

      <ng-container *ngIf="isAuthenticated; else notLoggedIn">
        <p>Привет, {{ username }}</p>
        <button (click)="logout()">Выход</button>
      </ng-container>

      <ng-template #notLoggedIn>
        <button routerLink="/login">Логин</button>
      </ng-template>
    </div>
  `,
  styles: [`
    .auth-panel {
      width: 260px;
      height: 200px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: #0d9bd3ff;
      color: #fff;
    }

    p {
      margin: 6px 0;
      font-weight: bold;
    }

    button {
      background: #0bf003;
      border: none;
      padding: 8px 12px;
      cursor: pointer;
      color: #000;
      font-weight: bold;
      border-radius: 4px;
      margin-top: 6px;
    }

    button:hover {
      background: #09c002;
    }
  `]
})
export class HeaderAuthPanelComponent {
  isAuthenticated = false;
  username = 'Гость';

  constructor(private auth: AuthService) {
    this.auth.token$.subscribe(token => {
      if (token) {
        this.isAuthenticated = true;
        this.username = this.extractUsername(token) || 'Неизвестный';
      } else {
        this.isAuthenticated = false;
        this.username = 'Гость';
      }
    });
  }

  logout() {
    this.auth.logout();
    this.isAuthenticated = false;
    this.username = 'Гость';
  }

  private extractUsername(token: string): string | null {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload?.unique_name || null;
    } catch {
      return null;
    }
  }
}