import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <section class="content">
      <div class="scroll-area">
        <div class="page-container">
          <router-outlet></router-outlet>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .content {
      flex: 1;
      min-width: 0;
      min-height: 0;
      display: flex;
      flex-direction: column;
      width: 100%;
      background: #ffe600ff;
    }

    .scroll-area {
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
      height: 100%;
      scrollbar-gutter: stable;
      padding: 20px;
      box-sizing: border-box;
    }
  `]
})
export class ContentComponent {}