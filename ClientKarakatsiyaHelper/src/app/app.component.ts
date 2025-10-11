import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, MainComponent, FooterComponent],
  template: `
    <app-header></app-header>
    <app-main></app-main>
    <app-footer></app-footer>
  `,
  styles: [`
    :host { 
      display: flex; 
      flex-direction: column; 
      height: 100vh; 
      width: 100vw;
      overflow: hidden;
    }

    app-header {
      display: flex;
      height: 160px;
      flex-shrink: 0;
    }

    app-main {
      flex: 1;
      display: flex;
      overflow: hidden;
    }

    app-footer {
      height: 60px;
      width: 100%;
      flex-shrink: 0;
    }
  `]
})
export class AppComponent {
  title = 'app';
}