import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  template: `
    <h2>Логин</h2>
    <form (ngSubmit)="login()">
      <input placeholder="Имя" [(ngModel)]="username" name="username" required>
      <input placeholder="Пароль" type="password" [(ngModel)]="password" name="password" required>
      <button type="submit">Войти</button>
    </form>
  `
})
export class LoginComponent {
  username = '';
  password = '';

  login() {
    alert(`Вход: ${this.username}`);
  }
}