import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface ItemCreateDto {
  Title: string;
  Description?: string;
  PurchasePrice: number;
  PurchaseDate: string;
  CategoryId: number;
  PhotoUrl?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenSubject = new BehaviorSubject<string | null>(null);
  token$ = this.tokenSubject.asObservable();

  private pendingEmail: string | null = null;
  private apiUrl = 'https://localhost:7280/api/auth';
  private itemsUrl = 'https://localhost:7280/api/items/create';

  constructor(private http: HttpClient) {}

  // ======================= Auth =======================
  register(email: string, username: string, password: string) {
    this.pendingEmail = email;
    return this.http.post(`${this.apiUrl}/register`, { email, username, password });
  }

  getPendingEmail(): string {
    return this.pendingEmail ?? '';
  }

  confirmEmail(code: string) {
    const email = this.getPendingEmail();
    return this.http.post(`${this.apiUrl}/confirm-email`, { email, code });
  }

  login(email: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { email, password })
      .pipe(tap(res => this.saveToken(res.token)));
  }

  saveToken(token: string) {
    localStorage.setItem('jwt', token);
    this.tokenSubject.next(token);
  }

  logout() {
    localStorage.removeItem('jwt');
    this.tokenSubject.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem('jwt');
  }

  // ======================= Items =======================
  createItem(dto: ItemCreateDto): Observable<any> {
  const token = this.getToken();
  if (!token) throw new Error('User is not authenticated');

  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  });

  return this.http.post(this.itemsUrl, dto, { headers });
}
}