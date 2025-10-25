import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

interface SaleDto {
  id: number;
  itemTitle: string;
  salePrice: number;
  profit: number;
  saleDate: string;
  photoUrl?: string;
}

@Component({
  selector: 'app-sales-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="sales-container">
      <div *ngFor="let sale of sales" class="sale-card">
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
      <p *ngIf="!sales.length" class="no-sales">Продаж пока нет.</p>
    </div>
  `,
  styles: [`
    .sales-container { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; padding: 20px; }
    .sale-card { background-color: #fff; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); overflow: hidden; transition: transform 0.2s ease, box-shadow 0.3s ease; }
    .sale-card:hover { transform: translateY(-6px); box-shadow: 0 10px 18px rgba(0,0,0,0.15); }
    .sale-image { width: 100%; height: 180px; object-fit: cover; }
    .sale-content { padding: 16px; display: flex; flex-direction: column; gap: 8px; }
    .sale-title { font-size: 18px; font-weight: 600; color: #333; }
    .sale-footer { display: flex; justify-content: space-between; align-items: center; margin-top: 10px; font-size: 14px; }
    .no-sales { color: #777; margin-top: 20px; grid-column: 1 / -1; text-align: center; }
  `]
})
export class SalesListComponent implements OnInit {
  sales: SaleDto[] = [];
  private apiUrl = `${environment.apiBaseUrl}/sales/my`;

  constructor(private http: HttpClient) {}

  ngOnInit() {
  this.http.get<SaleDto[]>(this.apiUrl).subscribe({
    next: (data: any[]) => {
      this.sales = data.map(s => ({
        ...s,
        photoUrl: s.photoUrls?.length ? s.photoUrls[0] : undefined
      }));
    },
    error: (err) => console.error('Ошибка загрузки продаж:', err)
  });
}
}