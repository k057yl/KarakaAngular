import { Component, inject, PLATFORM_ID } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  template: `
    <nav class="header">
      <div class="logo-container"></div>
      <div class="greeting-container"></div>
      <div class="button-container">
        <div class="button"><a routerLink="/home">Home</a></div>
        <div class="button"><a routerLink="/login">Login</a></div>
        <div class="button"><a routerLink="/register">Register</a></div>
      </div>
    </nav>
  `,
  styles: [`
    .header {
      display: flex;
      width: 100vw;
      align-items: center;
      justify-content: space-between;
      background: #ff8800ff;
      color: white;
      height: 100%;
      padding: 0 20px;
      box-sizing: border-box;
    }

    .logo-container{
      height: 100%;
      width: 200px;
      background: #00ff55ff;
    }

    .greeting-container{
      height: 100%;
      flex:1;
      background: #8c00ffff;
    }

    .button-container {
      height: 100%;
      width: 200px;
      flex-direction: column; 
      background: #01ccffff;
      display: flex;
      gap: 15px;
    }

    .button a {
      display: block;
      padding: 10px 20px;
      background: #fff;
      color: #000;
      border-radius: 4px;
      text-decoration: none;
    }

    .button a:hover {
      background: #ddd;
    }
  `]
})
export class HeaderComponent {}