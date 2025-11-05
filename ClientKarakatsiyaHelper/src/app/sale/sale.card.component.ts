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
      <img *ngIf="sale.photoUrl" [src]="sale.photoUrl" class="sale-image" />
      <div class="sale-content">
        <div class="sale-title">Name {{ sale.itemTitle }}</div>
        <div class="sale-footer">
          <span>💸 {{ sale.salePrice }}</span>
          <span [style.color]="sale.profit >= 0 ? 'green' : 'red'">{{ sale.profit }}</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .sale-card {
      width: 240px;
      background: #fff;
      border-radius: 10px;
      box-shadow: 0 3px 8px rgba(0,0,0,0.15);
      overflow: hidden;
    }
    .sale-image {
      width: 100%;
      height: 160px;
      object-fit: contain;
      background: #f5f5f5;
    }
  `]
})
export class SaleCardComponent {
  @Input() sale!: SaleDto;
}