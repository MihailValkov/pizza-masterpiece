import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../shared/interfaces/product';

@Injectable()
export class AdminService {
  constructor(private http: HttpClient) {}

  createProduct(formData: FormData) {
    return this.http.post<IProduct>('/admin/products', formData);
  }

  loadProduct(id: string) {
    return this.http.get<IProduct>(`/admin/products/${id}`);
  }
}
