import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ILoginUser,
  IRegisterUser,
  IUpdateUserInfo,
  IUser,
} from '../shared/interfaces/user';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  login(userData: ILoginUser): Observable<IUser> {
    return this.http.post<IUser>('/auth/login', userData);
  }
  register(userData: IRegisterUser): Observable<IUser> {
    return this.http.post<IUser>('/auth/register', userData);
  }
  logout(): Observable<{ message: string }> {
    return this.http.post<{ message: string }>('/auth/logout', {});
  }
  authenticate(): Observable<IUser> {
    return this.http.get<IUser>('/auth/authenticate');
  }
  updateUserImage(
    formData: FormData
  ): Observable<{ url: string; _id: string }> {
    return this.http.patch<{ url: string; _id: string }>(
      '/auth/update-user-image',
      formData
    );
  }

  updateUserInfo(userInfo: IUpdateUserInfo): Observable<IUpdateUserInfo> {
    return this.http.patch<IUpdateUserInfo>('/auth/update-user-info', userInfo);
  }
}
