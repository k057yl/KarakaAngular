import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="home">
      <h1>Добро пожаловать на сайт!</h1>
      <p>Здесь вы можете создавать объекты, просматривать их и многое другое.</p>

      <button *ngIf="!isAuthenticated" routerLink="/register" class="start-btn">
        Начать
      </button>
    </div>
  `,
  styles: [`
    .home {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: calc(100vh - 60px - 60px);
      text-align: center;
      gap: 20px;
      background: var(--bg);
      color: var(--text);
      padding: 1rem;
    }

    .start-btn {
      padding: 10px 20px;
      font-size: 1.1rem;
      font-weight: bold;
      border: none;
      border-radius: 6px;
      background: #0bf003;
      color: #000;
      cursor: pointer;
      transition: background 0.2s ease;
    }

    .start-btn:hover {
      background: #09c002;
    }
  `]
})
export class HomeComponent {
  isAuthenticated = false;

  constructor(private auth: AuthService) {
    this.auth.token$.subscribe(token => {
      this.isAuthenticated = !!token;
    });
  }
}