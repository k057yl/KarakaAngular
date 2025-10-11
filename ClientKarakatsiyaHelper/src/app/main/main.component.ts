import { Component } from '@angular/core';
import { LeftPanelComponent } from '../panels/left-panel.component';
import { ContentComponent } from '../content/content.component';
import { RightPanelComponent } from '../panels/right-panel.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [LeftPanelComponent, ContentComponent, RightPanelComponent],
  template: `
    <main class="main">
      <app-left-panel></app-left-panel>
      <app-content></app-content>
      <app-right-panel></app-right-panel>
    </main>
  `,
  styles: [`
    .main {
      display: flex;
      flex: 1;
      overflow: hidden;
      background: #00fa92ff;
    }

    app-left-panel{
      display: flex;
      padding-left: 20px;
    }

    app-content{
      display: flex;
      width: calc(100vw - 400px);
    }

    app-right-panel{
      display: flex;
      padding-right: 20px;
    }
  `]
})
export class MainComponent {}