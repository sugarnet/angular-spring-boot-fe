import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Sale } from '../models/sale';
import { Observable } from 'rxjs';
import { URL_BACKEND } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  private url: string = URL_BACKEND + '/api/v1/sales';

  constructor(private http: HttpClient, private router: Router) { }

  getSale(id: number) {
    return this.http.get<Sale>(`${this.url}/${id}`);
  }

  deleteSale(id: number) {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  create(sale: Sale): Observable<Sale> {
    return this.http.post<Sale>(`${this.url}`, sale);
  }
}
