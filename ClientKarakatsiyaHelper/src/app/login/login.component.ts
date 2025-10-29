import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
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

      <p *ngIf="isLoggedIn" class="greeting">
        Привет, {{ email }}!
      </p>

      <p *ngIf="!isLoggedIn && message" class="error">
        {{ message }}
      </p>
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

    .greeting {
      margin-top: 1rem;
      color: #4ef0c3;
      font-weight: bold;
    }

    .error {
      margin-top: 1rem;
      color: #ff7777;
    }
  `]
})
export class LoginComponent {
  email = '';
  password = '';
  message = '';
  isLoggedIn = false;

  constructor(private auth: AuthService) {}

  login() {
    this.auth.login(this.email, this.password).subscribe({
      next: (res: { token: string }) => {
        this.auth.saveToken(res.token);
        this.isLoggedIn = true;
        this.message = '';
      },
      error: () => {
        this.isLoggedIn = false;
        this.message = 'Ошибка входа';
      }
    });
  }
}