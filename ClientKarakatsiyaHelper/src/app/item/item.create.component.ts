import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService, ItemCreateDto } from '../services/auth.service';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

interface Category {
  id: number;
  name: string;
}

@Component({
  selector: 'app-item-create',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="create-container">
      <h3>Создать айтем</h3>

      <input placeholder="Название" [(ngModel)]="item.Title">
      <input placeholder="Описание" [(ngModel)]="item.Description">
      <input type="number" placeholder="Цена покупки" [(ngModel)]="item.PurchasePrice">
      <input type="date" [(ngModel)]="item.PurchaseDate">

      <select [(ngModel)]="item.CategoryId">
        <option [value]="0" disabled>Выберите категорию</option>
        <option *ngFor="let c of categories" [value]="c.id">{{ c.name }}</option>
      </select>

      <input type="file" (change)="uploadImage($event)">
      <div *ngIf="photoUrl" class="preview">
        <p>Фото загружено:</p>
        <img [src]="photoUrl" alt="preview">
      </div>

      <button (click)="createItem()">Создать</button>
      <p>{{ message }}</p>
    </div>
  `,
  styles: [`
    .create-container {
      max-width: 400px;
      margin: 30px auto;
      padding: 20px;
      border-radius: 12px;
      background: var(--item-create-bg);
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    input, select, button {
      padding: 8px 12px;
      border-radius: 8px;
      border: 1px solid #ccc;
      font-size: 14px;
    }

    input:focus, select:focus {
      border-color: #3f51b5;
      outline: none;
    }

    button {
      background-color: #3f51b5;
      color: white;
      font-weight: 600;
      cursor: pointer;
      transition: 0.2s ease;
    }

    button:hover {
      background-color: #5c6bc0;
    }

    .preview {
      text-align: center;
    }

    .preview img {
      max-width: 100%;
      border-radius: 10px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.2);
    }
  `]
})
export class ItemCreateComponent implements OnInit {
  item: ItemCreateDto = {
    Title: '',
    Description: '',
    PurchasePrice: 0,
    PurchaseDate: '',
    CategoryId: 0,
  };

  categories: Category[] = [];
  message = '';
  photoUrl = '';

  private categoriesUrl = `${environment.apiBaseUrl}/categories`;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.auth.token$.subscribe(token => {
      if (!token) {
        this.router.navigate(['/login']);
      } else {
        this.loadCategories();
      }
    });
  }

  loadCategories() {
    this.auth['http'].get<Category[]>(this.categoriesUrl).subscribe({ 
      next: data => this.categories = data,
      error: err => console.error('Ошибка загрузки категорий', err)
    });
  }

  uploadImage(event: any) {
  const file = event.target.files[0];
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', environment.cloudinaryPreset);

  fetch(environment.cloudinaryUrl, {
    method: 'POST',
    body: formData
  })
  .then(res => res.json())
  .then(data => {
    if (data.secure_url) {
      this.photoUrl = data.secure_url;
    } else {
      console.error('Ошибка загрузки на Cloudinary', data);
    }
  })
  .catch(err => console.error('Upload error:', err));
}

  createItem(): void {
  if (!this.item.Title.trim()) {
    this.message = 'Введите название!';
    return;
  }

  if (!this.item.CategoryId) {
    this.message = 'Выберите категорию!';
    return;
  }

  if (!this.item.PurchasePrice || this.item.PurchasePrice <= 0) {
    this.message = 'Введите корректную цену!';
    return;
  }

  if (!this.photoUrl) {
    this.message = 'Сначала загрузите фото!';
    return;
  }

  const dto: ItemCreateDto = {
    ...this.item,
    PurchaseDate: new Date(this.item.PurchaseDate).toISOString(),
    PhotoUrl: this.photoUrl
  };

  this.auth.createItem(dto).subscribe({
    next: () => this.message = 'Айтем успешно создан!',
    error: err => {
      console.error(err);
      this.message = 'Ошибка создания: ' + (err.message || 'Неизвестная ошибка');
    }
  });
}
}