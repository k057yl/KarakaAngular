import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  template: `
    <h2>Регистрация</h2>

    <form *ngIf="!codeSent" (ngSubmit)="register()">
      <input [(ngModel)]="username" name="username" placeholder="Имя" required>
      <input [(ngModel)]="email" name="email" placeholder="Email" required>
      <input [(ngModel)]="password" name="password" placeholder="Пароль" type="password" required>
      <input [(ngModel)]="passwordConfirm" name="passwordConfirm" placeholder="Повторите пароль" type="password" required>
      <button type="submit">Зарегистрироваться</button>
    </form>

    <form *ngIf="codeSent" (ngSubmit)="confirm()">
      <p>Введите код, отправленный на {{email}}</p>
      <input [(ngModel)]="code" name="code" placeholder="Код" required>
      <button type="submit">Подтвердить</button>
    </form>

    <p>{{message}}</p>
  `
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';
  passwordConfirm = '';
  code = '';
  codeSent = false;
  message = '';

  constructor(private http: HttpClient) {}

  register() {
    if (this.password !== this.passwordConfirm) {
      this.message = 'Пароли не совпадают';
      return;
    }

    this.http.post('https://localhost:7276/api/auth/register', {
      Username: this.username,
      Email: this.email,
      Password: this.password
    }).subscribe({
      next: () => {
        this.codeSent = true;
        this.message = 'Код отправлен на почту';
      },
      error: err => this.message = 'Ошибка: ' + JSON.stringify(err.error)
    });
  }

  confirm() {
    this.http.post('https://localhost:7276/api/auth/confirm-email', {
      email: this.email,
      code: this.code
    }).subscribe({
      next: () => this.message = 'Email подтвержден!',
      error: err => this.message = 'Ошибка: ' + JSON.stringify(err.error)
    });
  }
}