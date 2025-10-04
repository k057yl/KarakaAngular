import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  template: `
    <nav style="display: flex; gap: 15px; margin: 10px;">
      <a routerLink="/home">Home</a>
      <a routerLink="/login">Login</a>
      <a routerLink="/register">Register</a>
    </nav>
  `
})
export class HeaderComponent {}