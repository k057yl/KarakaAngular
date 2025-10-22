import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService, ItemCreateDto } from '../auth.service';

interface Category {
  id: number;
  name: string;
}

@Component({
  selector: 'app-item-create',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <h3>Создать айтем</h3>

    <input placeholder="Название" [(ngModel)]="item.Title">
    <input placeholder="Описание" [(ngModel)]="item.Description">
    <input type="number" placeholder="Цена покупки" [(ngModel)]="item.PurchasePrice">
    <input type="date" placeholder="Дата покупки" [(ngModel)]="item.PurchaseDate">

    <select [(ngModel)]="item.CategoryId">
      <option [value]="0" disabled>Выберите категорию</option>
      <option *ngFor="let c of categories" [value]="c.id">{{ c.name }}</option>
    </select>

    <input type="file" (change)="uploadImage($event)">
    <div *ngIf="photoUrl">
      <p>Фото загружено:</p>
      <img [src]="photoUrl" alt="preview" width="150">
    </div>

    <button (click)="createItem()">Создать</button>
    <p>{{ message }}</p>
  `
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
  photoUrl = ''; // сюда сохраняем URL Cloudinary
  private categoriesUrl = 'https://localhost:7280/api/categories';

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.loadCategories();
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
  formData.append('upload_preset', 'drne5mbi9'); // точное имя пресета

  fetch('https://api.cloudinary.com/v1_1/drne5mbi9/image/upload', {
    method: 'POST',
    body: formData
  })
  .then(res => res.json())
  .then(data => {
    console.log('Cloudinary response:', data); // <--- проверь, есть ли secure_url
    if (data.secure_url) {
      this.photoUrl = data.secure_url;
    } else {
      console.error('Ошибка загрузки на Cloudinary', data);
    }
  })
  .catch(err => console.error('Upload error:', err));
}

  createItem() {
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

  console.log('Отправляем DTO:', dto);

  this.auth.createItem(dto).subscribe({
    next: () => this.message = 'Айтем успешно создан!',
    error: err => {
      console.error(err);
      this.message = 'Ошибка создания: ' + (err.message || 'Неизвестная ошибка');
    }
  });
}
}