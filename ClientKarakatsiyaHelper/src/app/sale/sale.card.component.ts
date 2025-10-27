import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface SaleDto {
  id: number;
  itemTitle: string;
  salePrice: number;
  profit: number;
  saleDate: string;
  photoUrl?: string;
}

@Component({
  selector: 'app-sale-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="sale-card">
      <img *ngIf="sale.photoUrl" [src]="sale.photoUrl" class="sale-image" alt="item photo" />
      <div class="sale-content">
        <div class="sale-title">{{ sale.itemTitle }}</div>
        <div class="sale-footer">
          <span>💸 {{ sale.salePrice | number:'1.0-2' }}</span>
          <span [ngStyle]="{'color': sale.profit >= 0 ? 'green' : 'red'}">
            {{ sale.profit | number:'1.0-2' }}
          </span>
          <span>{{ sale.saleDate | date:'short' }}</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .sale-card { background-color: #fff; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);
      overflow: hidden; transition: transform 0.2s ease, box-shadow 0.3s ease; }
    .sale-card:hover { transform: translateY(-6px); box-shadow: 0 10px 18px rgba(0,0,0,0.15); }
    .sale-image { width: 100%; height: 160px; object-fit: contain; background-color: #f6f6f6;
      display: block; border-radius: 6px; margin-top: 12px; }
    .sale-content { padding: 16px; display: flex; flex-direction: column; gap: 8px; }
    .sale-title { font-size: 18px; font-weight: 600; color: #333; }
    .sale-footer { display: flex; justify-content: space-between; align-items: center;
      margin-top: 10px; font-size: 14px; }
  `]
})
export class SaleCardComponent {
  @Input() sale!: SaleDto;
}