import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ItemDto {
  id: number;
  title: string;
  description?: string;
  purchasePrice: number;
  photoUrls: string[];
  status: string;
}

@Component({
  selector: 'app-item-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="item-card">
      <img *ngIf="item.photoUrls?.length"
           [src]="item.photoUrls[0]"
           class="item-image"
           alt="item photo" />
      <div class="item-content">
        <div class="item-title">{{ item.title }}</div>
        <div class="item-description">{{ item.description }}</div>
        <div class="item-footer">
          <span>💸 {{ item.purchasePrice | number:'1.0-2' }}</span>

          <button *ngIf="item.status === 'available'"
                  class="sell-btn"
                  (click)="sell.emit(item)">
            Продать
          </button>

          <span *ngIf="item.status === 'sold'" class="sold-label">Продано</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .item-card { background-color: #8be6e6ff; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);}
    .item-card:hover { transform: translateY(-6px); box-shadow: 0 10px 18px rgba(0,0,0,0.15); }
    .item-image { width: 260px; height: 160px; object-fit: contain; background: #3ec084ff;
      display: block; margin: 0 auto; padding: 10px;}
    .item-content { padding: 16px; display: flex; flex-direction: column; gap: 8px; }
    .item-title { font-size: 18px; font-weight: 600; color: #333; }
    .item-description { font-size: 14px; color: #666; line-height: 1.4; height: 40px; overflow: hidden; text-overflow: ellipsis; }
    .item-footer { display: flex; justify-content: space-between; align-items: center; margin-top: 10px; }
    .sell-btn { background-color: #4caf50; border: none; border-radius: 6px; padding: 6px 12px; color: white; font-weight: bold; cursor: pointer; transition: background-color 0.2s ease; }
    .sell-btn:hover { background-color: #43a047; }
    .sold-label { color: red; font-weight: bold; }
  `]
})
export class ItemCardComponent {
  @Input() item!: ItemDto;
  @Output() sell = new EventEmitter<ItemDto>();
}