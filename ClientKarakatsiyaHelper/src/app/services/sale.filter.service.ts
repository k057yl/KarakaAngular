import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { SaleDto } from '../sale/sale.card.component';

export interface SaleFilter {
  minPrice?: number;
  maxPrice?: number;
  startDate?: string;
  endDate?: string;
  sortBy?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SaleFilterService {
  constructor(private api: ApiService) {}

  filterSales(filter: SaleFilter): Observable<SaleDto[]> {
    const params = new URLSearchParams();

    if (filter.minPrice) params.set('minPrice', filter.minPrice.toString());
    if (filter.maxPrice) params.set('maxPrice', filter.maxPrice.toString());
    if (filter.startDate) params.set('startDate', filter.startDate);
    if (filter.endDate) params.set('endDate', filter.endDate);
    if (filter.sortBy) params.set('sortBy', filter.sortBy);

    const query = params.toString();
    const endpoint = query ? `itemfilter?${query}` : 'itemfilter';

    return this.api.get<SaleDto[]>(endpoint);
  }
}