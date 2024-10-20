import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BACKEND_URL } from '../components/config/constants';
import { logout } from '../store/auth/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url: string = `${BACKEND_URL}/login`;

  private _user: any;

  constructor(private store: Store<{ auth: any }>, private http: HttpClient) {
    this.store.select('auth').subscribe((state) => (this._user = state));
  }

  login({ username, password }: any): Observable<any> {
    return this.http.post<any>(this.url, { username, password });
  }

  set user(user: any) {
    sessionStorage.setItem('login', JSON.stringify(user));
  }

  get user(): any {
    return this._user;
  }

  set token(token: string) {
    sessionStorage.setItem('token', token);
  }

  get token(): string {
    return sessionStorage.getItem('token')!;
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
    this.store.dispatch(logout());
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('login');
  }
}
