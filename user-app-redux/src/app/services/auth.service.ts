import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url: string = 'http://localhost:8080/login';

  private _token: string | undefined;
  private _user: any = {
    user: undefined,
    isAuth: false,
    isAdmin: false
  }

  constructor(private http: HttpClient) { }

  login({username, password}: any): Observable<any> {
    return this.http.post<any>(this.url, {username, password});
  }

  set user(user: any) {
    this._user = user;
    sessionStorage.setItem('login', JSON.stringify(user));
  }

  get user(): any {

    if (this._user.isAuth) {
      return this._user;
    } else if (sessionStorage.getItem('login') != null) {
      this._user = JSON.parse(sessionStorage.getItem('login') || '{}');
    }

    return this._user;
  }

  set token(token: string) {
    this._token = token;
    sessionStorage.setItem('token', token);
  }

  get token(): string {

    if (this._token != undefined) {
      return this._token;
    } else if (sessionStorage.getItem('token') != null) {
      this._token = sessionStorage.getItem('token') || '';
    }

    return this._token!;
  }

  getPayload(token: string) {
    if (token != null) {
      return JSON.parse(atob(token.split('.')[1]));
    }

    return null;
  }

  isAdmin() {
    return this.user.isAdmin;
  }

  isAuthenticated() {
    return this.user.isAuth;
  }

  logout() {
    this._token = undefined;
    this._user = {
      user: undefined,
      isAuth: false,
      isAdmin: false
    };
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('login');
  }
}
