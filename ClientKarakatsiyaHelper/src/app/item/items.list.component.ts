import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

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
            <span>Автор: {{ item.userName }}</span>
            <span>{{ item.createdAt | date:'short' }}</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .items-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 20px;
      padding: 20px;
      justify-content: center;
    }

    .item-card {
      background-color: #fff;
      border-radius: 12px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      transition: transform 0.2s ease, box-shadow 0.3s ease;
      cursor: pointer;
    }

    .item-card:hover {
      transform: translateY(-6px);
      box-shadow: 0 10px 18px rgba(0, 0, 0, 0.15);
    }

    .item-image {
      width: 100%;
      height: 180px;
      object-fit: cover;
    }

    .item-content {
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .item-title {
      font-size: 18px;
      font-weight: 600;
      color: #333;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    .item-description {
      font-size: 14px;
      color: #666;
      line-height: 1.4;
      height: 40px;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .item-footer {
      margin-top: auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #888;
      font-size: 13px;
    }

    @media (max-width: 768px) {
      .items-container {
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      }
    }
  `]
})
export class ItemsListComponent implements OnInit {
  items: any[] = [];
  private apiUrl = `${environment.apiBaseUrl}/items/my`;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get(this.apiUrl).subscribe({
      next: (data: any) => this.items = data,
      error: (err) => console.error('Ошибка загрузки айтемов:', err)
    });
  }
}