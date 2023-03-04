import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {
  IAccountStatus,
  IAdminBaseProduct,
  IAdminOrder,
  IAdminOrderBaseUserInfo,
  IAdminProduct,
  IAdminUser,
  IBaseAdminOrder,
  IBaseAdminUser,
  IOrderStatus,
  IRole,
} from "../shared/interfaces/admin";

@Injectable()
export class AdminService {
  constructor(private http: HttpClient) {}

  createProduct(formData: FormData): Observable<{ product: IAdminBaseProduct }> {
    return this.http.post<{ product: IAdminBaseProduct }>("/admin/products", formData);
  }

  loadProduct(productId: string): Observable<{ product: IAdminProduct }> {
    return this.http.get<{ product: IAdminProduct }>(`/admin/products/${productId}`);
  }

  loadProducts(
    page: number,
    limit: number,
    sort: string,
    order: "" | "asc" | "desc",
    searchValue: string,
    selectValue: string
  ): Observable<{
    products: IAdminBaseProduct[];
    count: number;
  }> {
    return this.http.get<{
      products: IAdminBaseProduct[];
      count: number;
    }>(
      `/admin/products?page=${
        page + 1
      }&limit=${limit}&sort=${sort}&order=${order}&searchValue=${searchValue}&selectValue=${selectValue}`
    );
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
    order: "" | "asc" | "desc",
    searchValue: string,
    selectValue: string
  ): Observable<{
    users: IBaseAdminUser[];
    count: number;
    roles: IRole[];
    accountStatuses: IAccountStatus[];
  }> {
    return this.http.get<{
      users: IBaseAdminUser[];
      count: number;
      roles: IRole[];
      accountStatuses: IAccountStatus[];
    }>(
      `/admin/users?page=${
        page + 1
      }&limit=${limit}&sort=${sort}&order=${order}&searchValue=${searchValue}&selectValue=${selectValue}`
    );
  }

  changeUserAccountSettings(
    userId: string,
    role: IRole,
    accountStatus: IAccountStatus
  ): Observable<{
    role: IRole;
    accountStatus: IAccountStatus;
    email: string;
  }> {
    return this.http.patch<{
      role: IRole;
      accountStatus: IAccountStatus;
      email: string;
    }>(`/admin/users/${userId}`, { role, accountStatus });
  }

  loadOrder(orderId: string): Observable<{ order: IAdminOrder }> {
    return this.http.get<{ order: IAdminOrder }>(`/admin/orders/${orderId}`);
  }

  changeOrderStatus(
    orderId: string,
    status: IOrderStatus
  ): Observable<{
    status: IOrderStatus;
  }> {
    return this.http.patch<{
      status: IOrderStatus;
    }>(`/admin/orders/${orderId}`, { status });
  }

  loadOrders(
    page: number,
    limit: number,
    sort: string,
    order: "" | "asc" | "desc",
    searchValue: string,
    selectValue: string
  ): Observable<{
    orders: IBaseAdminOrder<IAdminOrderBaseUserInfo>[];
    count: number;
    orderStatuses: IOrderStatus[];
  }> {
    return this.http.get<{
      orders: IBaseAdminOrder<IAdminOrderBaseUserInfo>[];
      count: number;
      orderStatuses: IOrderStatus[];
    }>(
      `/admin/orders?page=${
        page + 1
      }&limit=${limit}&sort=${sort}&order=${order}&searchValue=${searchValue}&selectValue=${selectValue}`
    );
  }
}
