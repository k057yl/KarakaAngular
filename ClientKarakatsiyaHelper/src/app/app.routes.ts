import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ItemCreateComponent } from './item/item.create.component';
import { ItemsListComponent } from './item/items.list.component';
import { SalesListComponent } from './sale/sale.list.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'item-create', component: ItemCreateComponent },
  { path: 'item-list', component: ItemsListComponent },
  { path: 'sale-list', component: SalesListComponent }
];