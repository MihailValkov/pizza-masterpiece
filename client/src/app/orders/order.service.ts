import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IOrder, IOrderDetail } from '../shared/interfaces/order';

@Injectable()
export class OrderService {
  constructor(private http: HttpClient) {}

  createNewOrder(order: IOrder): Observable<IOrder> {
    return this.http.post<IOrder>('/orders', order);
  }

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
}
