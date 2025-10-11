import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  template: `
    <h2>Логин</h2>
    <form (ngSubmit)="login()">
      <input placeholder="Имя" [(ngModel)]="username" name="username" required>
      <input placeholder="Пароль" type="password" [(ngModel)]="password" name="password" required>
      <button type="submit">Войти</button>
    </form>

    <p *ngIf="message">{{ message }}</p>
  `
})
export class LoginComponent {
  username = '';
  password = '';
  message = '';

  constructor(private http: HttpClient) {}

  login() {
    this.http.post<any>('/api/auth/login', {
      username: this.username,
      password: this.password
    }).subscribe({
      next: res => {
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          this.message = 'Успешный вход!';
          console.log('JWT:', res.token);
        } else {
          this.message = 'Ошибка: токен не получен';
        }
      },
      error: err => {
        console.error('Ошибка при логине:', err);
        this.message = 'Неверный логин или пароль';
      }
    });
  }
}