import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URL_BACKEND } from 'src/app/config/config';
import { Product } from 'src/app/sales/models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url: string = URL_BACKEND + '/api/v1/products';

  constructor(private http: HttpClient) { }

  findProductsByName(text: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.url}/search/${text}`);
  }
}
