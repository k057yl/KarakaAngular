import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ItemCreateComponent } from './item/item.create.component';
import { ItemsListComponent } from './item/items.list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'item-create', component: ItemCreateComponent },
  { path: 'item-list', component: ItemsListComponent },
];