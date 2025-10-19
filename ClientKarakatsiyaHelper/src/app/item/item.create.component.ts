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
    //UserId: ''
  };

  categories: Category[] = [];
  message = '';
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

  const dto: ItemCreateDto = {
    Title: this.item.Title,
    Description: this.item.Description,
    PurchasePrice: this.item.PurchasePrice,
    PurchaseDate: new Date(this.item.PurchaseDate).toISOString(),
    CategoryId: this.item.CategoryId
  };

  this.auth.createItem(dto).subscribe({
    next: () => this.message = 'Айтем успешно создан!',
    error: err => {
      console.error(err); // полностью логируем объект ошибки
      if (err.error && err.error.errors) {
        this.message = 'Ошибка создания: ' + JSON.stringify(err.error.errors);
      } else {
        this.message = 'Ошибка создания: ' + err.message;
      }
    }
  });
}
}