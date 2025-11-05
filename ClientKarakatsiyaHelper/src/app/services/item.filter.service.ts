import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

export interface ItemFilter {
  minPrice?: number;
  maxPrice?: number;
  startDate?: string;
  endDate?: string;
  sortBy?: string;
}

@Injectable({ providedIn: 'root' })
export class ItemFilterService {
  private apiUrl = `${environment.apiBaseUrl}/itemfilter`;

  constructor(private http: HttpClient) {}

  filterItems(filter: ItemFilter): Observable<any[]> {
  const params = new URLSearchParams();

  if (filter.minPrice) params.set('minPrice', filter.minPrice.toString());
  if (filter.maxPrice) params.set('maxPrice', filter.maxPrice.toString());
  if (filter.startDate) params.set('startDate', filter.startDate);
  if (filter.endDate) params.set('endDate', filter.endDate);
  if (filter.sortBy) params.set('sortBy', filter.sortBy);

  return this.http.get<any[]>(`${this.apiUrl}?${params.toString()}`);
}
}