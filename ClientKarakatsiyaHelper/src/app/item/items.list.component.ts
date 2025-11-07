import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { ItemCardComponent, ItemDto } from '../item/item.card.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-items-list',
  standalone: true,
  imports: [CommonModule, ItemCardComponent],
  template: `
    <div class="pagination-container">
      <button (click)="prevPage()" [disabled]="currentPage === 1">&lt;</button>
      <span>Страница {{currentPage}} / {{totalPages}}</span>
      <button (click)="nextPage()" [disabled]="currentPage === totalPages">&gt;</button>
    </div>

    <div class="items-container">
      <app-item-card
        *ngFor="let item of pagedItems"
        [item]="item"
        (sell)="sellItem($event)">
      </app-item-card>
    </div>

    <div class="pagination-container bottom">
      <button (click)="prevPage()" [disabled]="currentPage === 1">&lt;</button>
      <span>Страница {{currentPage}} / {{totalPages}}</span>
      <button (click)="nextPage()" [disabled]="currentPage === totalPages">&gt;</button>
    </div>
  `,
  styles: [`
    .items-container {
      display: grid;
      grid-template-columns: repeat(2, 300px);
      justify-content: center;
      gap: 20px 200px;
      margin: 20px 0;
    }

    app-item-card {
      width: 300px;
      height: 500px;
    }

    .pagination-container {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 12px;
      margin: 10px 0;
    }

    .pagination-container.bottom {
      margin-bottom: 30px;
    }

    button {
      background: #333;
      color: #fff;
      border: none;
      padding: 6px 12px;
      cursor: pointer;
      border-radius: 4px;
    }

    button:disabled {
      opacity: 0.4;
      cursor: default;
    }
  `]
})
export class ItemsListComponent implements OnInit {
  items: ItemDto[] = [];
  pagedItems: ItemDto[] = [];
  private apiUrl = `${environment.apiBaseUrl}/items/my`;
  private salesUrl = `${environment.apiBaseUrl}/sales`;
  itemsPerPage = 10;
  currentPage = 1;
  totalPages = 1;

  constructor(private http: HttpClient, private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.auth.token$.subscribe(token => {
      if (!token) {
        this.router.navigate(['/login']);
        return;
      }
      this.loadItems();
    });
  }

  private loadItems() {
    this.http.get<ItemDto[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.items = data.map(i => ({
          ...i,
          status: (i.status ?? 'available').toLowerCase()
        }));
        this.totalPages = Math.ceil(this.items.length / this.itemsPerPage);
        this.updatePage();
      },
      error: (err) => console.error('Ошибка загрузки айтемов:', err)
    });
  }

  updatePage() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    this.pagedItems = this.items.slice(start, start + this.itemsPerPage);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePage();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePage();
    }
  }

  sellItem(item: ItemDto) {
    const priceStr = prompt(`Введите цену продажи для "${item.title}":`, item.purchasePrice.toString());
    if (!priceStr) return;

    const salePrice = parseFloat(priceStr);
    if (isNaN(salePrice) || salePrice <= 0) {
      alert('Некорректная цена');
      return;
    }

    const saleDto = {
      itemId: item.id,
      salePrice: salePrice,
      saleDate: new Date().toISOString()
    };

    this.http.post(this.salesUrl, saleDto).subscribe({
      next: () => {
        alert('Продажа успешно зарегистрирована!');
        item.status = 'sold';
      },
      error: (err) => console.error('Ошибка создания продажи:', err)
    });
  }
}