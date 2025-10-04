import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RegisterDto {
  username: string;
  email: string;
  password: string;
}

export interface LoginDto {
  username: string;
  password: string;
}

export interface VerifyEmailDto {
  email: string;
  code: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7276/api/auth';

  constructor(private http: HttpClient) {}

  register(dto: RegisterDto): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, dto);
  }

  login(dto: LoginDto): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, dto);
  }

  verifyEmail(dto: VerifyEmailDto): Observable<any> {
  return this.http.post(`${this.apiUrl}/confirm-email`, dto);
  }
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  setToken(token: string, username: string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
  }

  getUsername(): string | null {
    return localStorage.getItem('username');
  }
}