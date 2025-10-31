import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { SaleCardComponent, SaleDto } from '../sale/sale.card.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sales-list',
  standalone: true,
  imports: [CommonModule, SaleCardComponent],
  template: `
    <div class="sales-container">
      <app-sale-card *ngFor="let sale of sales" [sale]="sale"></app-sale-card>
      <p *ngIf="!sales.length" class="no-sales">Продаж пока нет.</p>
    </div>
  `
})
export class SalesListComponent implements OnInit {
  sales: SaleDto[] = [];
  private apiUrl = `${environment.apiBaseUrl}/sales/my`;

  constructor(private http: HttpClient, private auth: AuthService, private router: Router) {}

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