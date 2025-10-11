import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-item-create',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  template: `
    <h2>Создание айтема</h2>
    <form (ngSubmit)="createItem()">
      <input [(ngModel)]="item.title" name="title" placeholder="Название" required>
      <textarea [(ngModel)]="item.description" name="description" placeholder="Описание"></textarea>
      <input type="number" [(ngModel)]="item.purchasePrice" name="purchasePrice" placeholder="Цена" required>
      <input type="date" [(ngModel)]="item.purchaseDate" name="purchaseDate" required>
      <input type="number" [(ngModel)]="item.categoryId" name="categoryId" placeholder="ID категории" required>

      <button type="submit">Создать</button>
    </form>
  `
})
export class ItemCreateComponent {
  item = {
  title: 'Тест',
  description: 'Описание',
  purchasePrice: 100,
  purchaseDate: new Date().toISOString(),
  categoryId: 1,
  userId: 'id_пользователя',
  status: 'available'
};

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // подставляем id из localStorage, JWT, или откуда угодно
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      this.item.userId = user.id; // например, user.id
    }
  }

  createItem() {
  const token = localStorage.getItem('jwt');
  if (!token) {
    console.error('Нет токена!');
    return;
  }

  this.http.post('/api/items', this.item, {
    headers: { Authorization: `Bearer ${token}` }
  }).subscribe({
    next: () => alert('Айтем успешно создан'),
    error: err => console.error('Ошибка при создании айтема:', err)
  });
}
}