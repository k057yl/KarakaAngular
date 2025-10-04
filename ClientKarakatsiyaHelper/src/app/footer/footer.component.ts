import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `<footer class="footer">© 2025 Karakatsiya</footer>`,
  styles: [`
    .footer {
      height: 60px;
      width: 100%;
      background: #222;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `]
})
export class FooterComponent {}