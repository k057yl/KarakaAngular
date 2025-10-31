import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TranslateService } from '../services/translate.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="home">
      <h1>{{ translate.t('HOME.WELCOME') }}</h1>
      <p>Здесь вы можете создавать объекты, просматривать их и многое другое.</p>

      <button *ngIf="!isAuthenticated" routerLink="/register" class="start-btn">
        {{ translate.t('HOME.START') }}
      </button>
    </div>
  `
})
export class HomeComponent {
  isAuthenticated = false;

  constructor(private auth: AuthService, public translate: TranslateService) {
    this.auth.token$.subscribe(token => {
      this.isAuthenticated = !!token;
    });
  }
}