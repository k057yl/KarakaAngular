import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService, ItemCreateDto } from '../services/auth.service';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { Lang } from '../i18n';
import { TranslateService } from '../services/translate.service';
import { Subscription } from 'rxjs';

interface Category {
  id: number;
  nameEn: string;
  nameUk: string;
}

interface CategoryOption {
  id: number;
  displayName: string;
}

@Component({
  selector: 'app-item-create',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="create-container">
      <h3 class="title">{{ t('ITEM_CREATE.TITLE') }}</h3>

      <input placeholder="{{ t('ITEM_CREATE.PLACEHOLDER_TITLE') }}" [(ngModel)]="item.Title">
      <input placeholder="{{ t('ITEM_CREATE.PLACEHOLDER_DESC') }}" [(ngModel)]="item.Description">
      <input type="number" placeholder="{{ t('ITEM_CREATE.PLACEHOLDER_PRICE') }}" [(ngModel)]="item.PurchasePrice">
      <input type="date" [(ngModel)]="item.PurchaseDate">

      <select [(ngModel)]="item.CategoryId">
        <option [value]="0" disabled>{{ t('ITEM_CREATE.CHOOSE_CATEGORY') }}</option>
        <option *ngFor="let c of categoryOptions" [value]="c.id">{{ c.displayName }}</option>
      </select>

      <label class="file-upload">
        <input type="file" (change)="uploadImage($event)">
        <span>{{ selectedFileName || t('ITEM_CREATE.CHOOSE_FILE') }}</span>
      </label>

      <div *ngIf="photoUrl" class="preview">
        <p>{{ t('ITEM_CREATE.PHOTO_UPLOADED') }}</p>
        <img [src]="photoUrl" alt="preview">
      </div>

      <button (click)="createItem()">{{ t('ITEM_CREATE.BUTTON_CREATE') }}</button>
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

    .title {
      text-align: center;
    }

    input, select, button {
      padding: 8px 12px;
      border-radius: 8px;
      border: 1px solid #444;
      font-size: 14px;
      background-color: var(--input-bg);
      color: var(--input-text);
    }

    input::placeholder {
      color: var(--input-text);
    }

    button {
      background-color: var(--botton-important-bg);
      color: white;
      font-weight: 600;
      cursor: pointer;
      transition: 0.2s ease;
    }

    button:hover {
      background-color: var(--botton-important-bg-hover);
    }

    .file-upload {
      position: relative;
      display: inline-block;
      overflow: hidden;
      border-radius: 8px;
      background-color: var(--input-bg);
      color: var(--input-text);
      text-align: center;
      padding: 10px;
      cursor: pointer;
    }

    .file-upload input[type="file"] {
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      width: 100%;
      height: 100%;
      cursor: pointer;
    }

    .file-upload span {
      pointer-events: none;
      font-size: 14px;
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
  categoryOptions: CategoryOption[] = [];
  message = '';
  photoUrl = '';
  selectedFileName = '';
  langSub?: Subscription;

  private categoriesUrl = `${environment.apiBaseUrl}/categories`;

  constructor(
    private auth: AuthService,
    private router: Router,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.auth.token$.subscribe(token => {
      if (!token) this.router.navigate(['/login']);
      else this.loadCategories();
    });

    this.langSub = this.translate.lang$.subscribe(() => {
      this.buildCategoryOptions();
    });
  }

  ngOnDestroy() {
    this.langSub?.unsubscribe();
  }

  loadCategories() {
    this.auth['http'].get<Category[]>(this.categoriesUrl).subscribe({ 
      next: data => {
        this.categories = data;
        this.buildCategoryOptions();
      },
      error: err => console.error('Ошибка загрузки категорий', err)
    });
  }

  buildCategoryOptions() {
    const lang: Lang = this.translate.getCurrentLang();
    this.categoryOptions = this.categories.map(c => ({
      id: c.id,
      displayName: lang === 'uk' ? c.nameUk : c.nameEn
    }));
  }

  uploadImage(event: any) {
    const file = event.target.files[0];
    if (!file) return;
    this.selectedFileName = file.name;

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
      this.message = this.t('ITEM_CREATE.ERROR_TITLE');
      return;
    }

    if (!this.item.CategoryId) {
      this.message = this.t('ITEM_CREATE.ERROR_CATEGORY');
      return;
    }

    if (!this.item.PurchasePrice || this.item.PurchasePrice <= 0) {
      this.message = this.t('ITEM_CREATE.ERROR_PRICE');
      return;
    }

    if (!this.photoUrl) {
      this.message = this.t('ITEM_CREATE.ERROR_PHOTO');
      return;
    }

    const dto: ItemCreateDto = {
      ...this.item,
      PurchaseDate: new Date(this.item.PurchaseDate).toISOString(),
      PhotoUrl: this.photoUrl
    };

    this.auth.createItem(dto).subscribe({
      next: () => this.message = this.t('ITEM_CREATE.SUCCESS'),
      error: err => {
        console.error(err);
        this.message = this.t('ITEM_CREATE.ERROR_CREATE');
      }
    });
  }

  t(key: string): string {
    return this.translate.t(key);
  }
}