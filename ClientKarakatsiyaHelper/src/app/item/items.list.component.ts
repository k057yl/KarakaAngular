import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface Item {
  id: number;
  title: string;
  description: string;
  purchasePrice: number;
  photoUrls: string[];
}

@Component({
  selector: 'app-items-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  template: `
    <div class="items-container">
      <div *ngFor="let item of items" class="item-card">
        <div class="item-photos" *ngIf="item.photoUrls?.length">
          <img *ngFor="let url of item.photoUrls" [src]="url" alt="{{ item.title }}" />
        </div>
        <div class="item-info">
          <h3>{{ item.title }}</h3>
          <p>{{ item.description }}</p>
          <div class="price">💸 {{ item.purchasePrice | number:'1.0-2' }}</div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .items-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 16px;
      padding: 16px;
    }

    .item-card {
      background: #1e1e1e;
      color: #eee;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 6px rgba(0,0,0,0.5);
      transition: transform 0.2s;
    }

    .item-card:hover {
      transform: scale(1.02);
    }

    .item-photos img {
      width: 100%;
      height: 200px;
      object-fit: cover;
      margin-bottom: 4px;
    }

    .item-info {
      padding: 12px;
    }

    .price {
      font-weight: bold;
      margin-top: 8px;
      color: #8fce00;
    }
  `]
})
export class ItemsListComponent implements OnInit {
  items: Item[] = [];
  apiUrl = 'https://localhost:7280/api/items';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadItems();
  }

  loadItems() {
    this.http.get<Item[]>(this.apiUrl).subscribe({
      next: (data) => this.items = data,
      error: (err) => console.error('Ошибка загрузки айтемов:', err)
    });
  }
}