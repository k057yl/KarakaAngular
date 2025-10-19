import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="login-wrapper">
      <h3>Login</h3>
      <input placeholder="Email" [(ngModel)]="email">
      <input type="password" placeholder="Password" [(ngModel)]="password">
      <button (click)="login()">Login</button>
      <p *ngIf="token">Token: {{ token }}</p>
      <p *ngIf="message">{{ message }}</p>
    </div>
  `,
  styles: [`
    .login-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 300px;
      border: 1px solid #fff;
      padding: 1rem;
      background: #222;
      color: #fff;
    }

    input {
      margin: 0.5rem 0;
    }
  `]
})

export class LoginComponent {
  email = '';
  password = '';
  token: string | null = null;
  message = '';

  constructor(private auth: AuthService) {
    this.auth.token$.subscribe(t => this.token = t);
  }

  login() {
    this.auth.login(this.email, this.password).subscribe({
      next: (res: { token: string }) => {
        this.auth.saveToken(res.token);
        this.message = 'Успешный вход';
      },
      error: () => this.message = 'Ошибка входа'
    });
  }
}