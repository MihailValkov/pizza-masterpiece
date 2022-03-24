import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILoginUser, IRegisterUser, IUser } from '../shared/interfaces/user';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  login(data: ILoginUser): Observable<IUser> {
    return this.http.post<IUser>('/auth/login', data);
  }
  register(data: IRegisterUser): Observable<IUser> {
    return this.http.post<IUser>('/auth/register', data);
  }
  logout(): Observable<{ message: string }> {
    return this.http.get<{ message: string }>('/auth/logout');
  }
  authenticate(): Observable<IUser> {
    return this.http.get<IUser>('/auth/profile');
  }
}
