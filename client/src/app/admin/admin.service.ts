import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  IAccountStatus,
  IAdminUser,
  IBaseAdminUser,
  IRoles,
} from '../shared/interfaces/admin';
import { IProduct } from '../shared/interfaces/product';

@Injectable()
export class AdminService {
  constructor(private http: HttpClient) {}

  createProduct(formData: FormData): Observable<IProduct> {
    return this.http.post<IProduct>('/admin/products', formData);
  }

  loadProduct(id: string): Observable<IProduct> {
    return this.http.get<IProduct>(`/admin/products/${id}`);
  }

  loadUser(userId: string): Observable<{ user: IAdminUser }> {
    return this.http.get<{
      user: IAdminUser;
    }>(`/admin/users/${userId}`);
  }

  loadUsers(
    page: number,
    limit: number,
    sort: string,
    order: '' | 'asc' | 'desc',
    searchValue: string,
    selectValue: string
  ): Observable<{ users: IBaseAdminUser[]; count: number; roles: IRoles[] }> {
    return this.http.get<{
      users: IBaseAdminUser[];
      count: number;
      roles: IRoles[];
    }>(
      `/admin/users?page=${
        page + 1
      }&limit=${limit}&sort=${sort}&order=${order}&searchValue=${searchValue}&selectValue=${selectValue}`
    );
  }

  changeUserInfo(
    userId: string,
    role: IRoles,
    accountStatus: IAccountStatus
  ): Observable<{
    role: IRoles;
    accountStatus: IAccountStatus;
    email: string;
  }> {
    return this.http.patch<{
      role: IRoles;
      accountStatus: IAccountStatus;
      email: string;
    }>(`/admin/users/${userId}`, { role, accountStatus });
  }
}
