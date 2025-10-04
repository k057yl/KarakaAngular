import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [FormsModule],
  template: `
    <h2>Сброс пароля</h2>
    <form (ngSubmit)="resetPassword()">
      <input type="password" [(ngModel)]="newPassword" name="newPassword" placeholder="Новый пароль" required>
      <button type="submit">Сохранить</button>
    </form>
    <p *ngIf="message">{{ message }}</p>
  `
})
export class ResetPasswordComponent {
  email = '';
  token = '';
  newPassword = '';
  message = '';

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
      this.token = params['token'];
    });
  }

  resetPassword() {
    this.http.post('http://localhost:7276/api/auth/reset-password', {
      email: this.email,
      token: this.token,
      newPassword: this.newPassword
    }).subscribe({
      next: () => {
        this.message = 'Пароль успешно изменен';
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: err => this.message = 'Ошибка: ' + JSON.stringify(err.error)
    });
  }
}