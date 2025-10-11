import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `<footer class="footer">© 2025 Karakatsiya</footer>`,
  styles: [`
    .footer {
      flex: 1;
      height: 100%;
      width: 100%;
      background: #06e006ff;
      color: #000;
      align-items: center;
      justify-content: center;
    }
  `]
})
export class FooterComponent {}