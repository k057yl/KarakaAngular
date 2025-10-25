import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

interface ItemDto {
  id: number;
  title: string;
  description?: string;
  purchasePrice: number;
  photoUrls: string[];
  status: string; // добавлено
}

@Component({
  selector: 'app-items-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="items-container">
      <div *ngFor="let item of items" class="item-card">
        <img *ngIf="item.photoUrls?.length" [src]="item.photoUrls[0]" class="item-image" alt="item photo" />
        <div class="item-content">
          <div class="item-title">{{ item.title }}</div>
          <div class="item-description">{{ item.description }}</div>
          <div class="item-footer">
            <span>💸 {{ item.purchasePrice | number:'1.0-2' }}</span>

            <button *ngIf="item.status === 'available'" class="sell-btn" (click)="sellItem(item)">
              Продать
            </button>

            <span *ngIf="item.status === 'sold'" class="sold-label">Продано</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .items-container { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; padding: 20px; }
    .item-card { background-color: #fff; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); overflow: hidden; transition: transform 0.2s ease, box-shadow 0.3s ease; }
    .item-card:hover { transform: translateY(-6px); box-shadow: 0 10px 18px rgba(0,0,0,0.15); }
    .item-image { width: 100%; height: 180px; object-fit: cover; }
    .item-content { padding: 16px; display: flex; flex-direction: column; gap: 8px; }
    .item-title { font-size: 18px; font-weight: 600; color: #333; }
    .item-description { font-size: 14px; color: #666; line-height: 1.4; height: 40px; overflow: hidden; text-overflow: ellipsis; }
    .item-footer { display: flex; justify-content: space-between; align-items: center; margin-top: 10px; }
    .sell-btn { background-color: #4caf50; border: none; border-radius: 6px; padding: 6px 12px; color: white; font-weight: bold; cursor: pointer; transition: background-color 0.2s ease; }
    .sell-btn:hover { background-color: #43a047; }
    .sold-label { color: red; font-weight: bold; }
  `]
})
export class ItemsListComponent implements OnInit {
  items: ItemDto[] = [];
  private apiUrl = `${environment.apiBaseUrl}/items/my`;
  private salesUrl = `${environment.apiBaseUrl}/sales`;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<ItemDto[]>(this.apiUrl).subscribe({
      next: (data) => {
        // Берём статус с сервера, приводим к нижнему регистру, безопасно
        this.items = data.map(i => ({
          ...i,
          status: (i.status ?? 'available').toLowerCase()
        }));
        console.log('items loaded:', this.items);
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
        item.status = 'sold'; // обновляем фронт
      },
      error: (err) => console.error('Ошибка создания продажи:', err)
    });
  }
}