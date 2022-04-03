import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProduct } from '../shared/interfaces/product';
import { Observable } from 'rxjs';
@Injectable()
export class ProductService {
  constructor(private http: HttpClient) {}

  loadProductById(id: string): Observable<IProduct> {
    return this.http.get<IProduct>(`/products/${id}`);
  }

  loadAllProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>('/products');
  }
}
