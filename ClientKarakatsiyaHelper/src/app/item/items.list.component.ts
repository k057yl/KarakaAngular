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
    <div class="items-container">
      <app-item-card
        *ngFor="let item of items"
        [item]="item"
        (sell)="sellItem($event)">
      </app-item-card>
    </div>
  `
})
export class ItemsListComponent implements OnInit {
  items: ItemDto[] = [];
  private apiUrl = `${environment.apiBaseUrl}/items/my`;
  private salesUrl = `${environment.apiBaseUrl}/sales`;

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
      },
      error: (err) => console.error('Ошибка загрузки айтемов:', err)
    });
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