import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { SaleCardComponent, SaleDto } from '../sale/sale.card.component';

@Component({
  selector: 'app-sales-list',
  standalone: true,
  imports: [CommonModule, SaleCardComponent],
  template: `
    <div class="sales-container">
      <app-sale-card *ngFor="let sale of sales" [sale]="sale"></app-sale-card>
      <p *ngIf="!sales.length" class="no-sales">Продаж пока нет.</p>
    </div>
  `,
  styles: [`
    .sales-container {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
      padding: 20px;
    }
    @media (max-width: 700px) {
      .sales-container {
        grid-template-columns: 1fr;
      }
    }
    .no-sales {
      color: #777;
      margin-top: 20px;
      grid-column: 1 / -1;
      text-align: center;
    }
  `]
})
export class SalesListComponent implements OnInit {
  sales: SaleDto[] = [];
  private apiUrl = `${environment.apiBaseUrl}/sales/my`;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.sales = data.map(s => ({
          ...s,
          photoUrl: s.photoUrls?.length ? s.photoUrls[0] : undefined
        }));
      },
      error: (err) => console.error('Ошибка загрузки продаж:', err)
    });
  }
}