import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { SaleCardComponent, SaleDto } from '../sale/sale.card.component';
import { AuthService } from '../services/auth.service';
import { SaleFilterService, SaleFilter } from '../services/sale.filter.service';

@Component({
  selector: 'app-sales-list',
  standalone: true,
  imports: [CommonModule, SaleCardComponent],
  template: `
    <div class="filters">
      <button (click)="applyFilter({ sortBy: 'price_asc' })">Цена ▲</button>
      <button (click)="applyFilter({ sortBy: 'price_desc' })">Цена ▼</button>
      <button (click)="applyFilter({ sortBy: 'date_desc' })">Новые</button>
    </div>

    <div class="sales-container">
      <app-sale-card *ngFor="let sale of sales" [sale]="sale"></app-sale-card>
      <p *ngIf="!sales.length" class="no-sales">Продаж пока нет.</p>
    </div>
  `,
  styles: [`
    .filters {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
    }

    .sales-container {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
      gap: 20px;
      justify-items: center;
    }
  `]
})
export class SalesListComponent implements OnInit {
  sales: SaleDto[] = [];
  private defaultUrl = `${environment.apiBaseUrl}/sales/my`;

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private router: Router,
    private filterService: SaleFilterService
  ) {}

  ngOnInit() {
    this.auth.token$.subscribe(token => {
      if (!token) {
        this.router.navigate(['/login']);
        return;
      }
      this.loadSales();
    });
  }

  private loadSales() {
    this.http.get<any[]>(this.defaultUrl).subscribe({
      next: (data) => this.setSales(data),
      error: (err) => console.error('Ошибка загрузки продаж:', err)
    });
  }

  applyFilter(filter: SaleFilter) {
    this.filterService.filterSales(filter).subscribe({
      next: (data) => this.setSales(data),
      error: (err) => console.error('Ошибка фильтрации:', err)
    });
  }

  private setSales(data: any[]) {
    this.sales = data.map(s => ({
      id: s.id,
      itemTitle: s.itemTitle ?? s.title,
      salePrice: s.salePrice ?? s.purchasePrice,
      profit: s.profit ?? 0,
      saleDate: s.saleDate ?? s.purchaseDate ?? new Date().toISOString(),
      photoUrl: s.photoUrls?.length ? s.photoUrls[0] : undefined
    }));
  }
}