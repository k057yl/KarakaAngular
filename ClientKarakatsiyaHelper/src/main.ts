import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

import { AppComponent } from './app/app.component';
import { HomeComponent } from './app/home/home.component';
import { LoginComponent } from './app/auth/login/login.component';
import { RegisterComponent } from './app/auth/register/register.component';
import { ResetPasswordComponent } from './app/auth/reset/reset-password.component';

const routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' as const },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'reset-password', component: ResetPasswordComponent }
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes)
  ]
});