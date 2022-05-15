import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  IOrder,
  IOrderDetail,
  IOrderProductDetail,
} from '../shared/interfaces/order';

@Injectable()
export class OrderService {
  constructor(private http: HttpClient) {}

  getMyOrders(
    page: number,
    limit: number,
    sort: string,
    order: '' | 'asc' | 'desc'
  ): Observable<{ ordersList: IOrder[]; count: number }> {
    return this.http.get<{ ordersList: IOrder[]; count: number }>(
      `/orders?page=${page + 1}&limit=${limit}&sort=${sort}&order=${order}`
    );
  }

  getMyOrder(orderId: string): Observable<IOrderDetail> {
    return this.http.get<IOrderDetail>(`/orders/${orderId}`);
  }

  getCurrentProduct(
    orderId: string,
    _id: string
  ): Observable<{ product: IOrderProductDetail }> {
    return this.http.get<{ product: IOrderProductDetail }>(
      `/orders/${orderId}/${_id}`
    );
  }

  rateProduct(
    productId: string,
    rate: number,
    comment: string
  ): Observable<{ rating: number }> {
    return this.http.patch<{ rating: number }>(`/products/rate/${productId}`, {
      rate,
      comment,
    });
  }
}
