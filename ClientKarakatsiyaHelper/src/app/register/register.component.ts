import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <h3>Регистрация</h3>

    <ng-container *ngIf="!codeSent">
      <input placeholder="Email" [(ngModel)]="email">
      <input placeholder="Username" [(ngModel)]="username">
      <input type="password" placeholder="Password" [(ngModel)]="password">
      <button (click)="register()">Register</button>
    </ng-container>

    <ng-container *ngIf="codeSent">
      <p>Код отправлен на {{ email }}</p>
      <input placeholder="Код из письма" [(ngModel)]="code">
      <button (click)="confirmEmail()">Подтвердить</button>
    </ng-container>

    <p>{{ message }}</p>
  `
})
export class RegisterComponent {
  email = '';
  username = '';
  password = '';
  code = '';
  message = '';
  codeSent = false;

  constructor(private auth: AuthService) {}

  register() {
    this.auth.register(this.email, this.username, this.password)
      .subscribe({
        next: () => {
          this.message = 'Код отправлен на почту';
          this.codeSent = true;
        },
        error: err => this.message = 'Ошибка регистрации'
      });
  }

  confirmEmail() {
    this.auth.confirmEmail(this.code)
      .subscribe({
        next: () => this.message = 'Email подтвержден!',
        error: () => this.message = 'Ошибка подтверждения'
      });
  }
}