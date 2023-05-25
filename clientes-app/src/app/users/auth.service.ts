import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';
import { URL_BACKEND } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _user: User;
  private _token: string;

  constructor(private http: HttpClient) { }

  public get user(): User {
    if (this._user != null) {
      return this._user;
    } else if (this._user == null && sessionStorage.getItem('user') != null) {
      this._user = JSON.parse(sessionStorage.getItem('user')) as User;
      return this._user;
    }

    return new User();
  }

  public get token(): string {
    if (this._token != null) {
      return this._token;
    } else if (this._token == null && sessionStorage.getItem('token') != null) {
      this._token = sessionStorage.getItem('token');
      return this._token;
    }

    return null;
  }

  login(user: User): Observable<any> {
    const url = URL_BACKEND + '/oauth/token';
    const credentials = btoa('angular-app' + ':' + '12345');
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + credentials
    });

    let params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', user.username);
    params.set('password', user.password);

    return this.http.post<any>(url, params.toString(), { headers });
  }

  saveUser(accessToken: string): void {
    let payload = this.getTokenData(accessToken);
    this._user = new User();
    this._user.name = payload.name;
    this._user.lastname = payload.lastname;
    this._user.email = payload.email;
    this._user.username = payload.user_name;
    this._user.roles = payload.authorities;

    sessionStorage.setItem('user', JSON.stringify(this._user))
  }

  saveToken(accessToken: string): void {
    this._token = accessToken;
    sessionStorage.setItem('token', accessToken);
  }

  getTokenData(accessToken: string): any {
    if (accessToken != null) {
      return JSON.parse(atob(accessToken.split('.')[1]));
    }
    return null;
  }

  isAuthenticated(): boolean {
    let payload = this.getTokenData(this.token);

    if (payload != null && payload.user_name && payload.user_name.length > 0) {
      return true;
    }

    return false;
  }

  logout(): void {
    this._token = null;
    this._token = null;
    sessionStorage.clear();
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
  }

  hasRole(role: string): boolean {
    if (this.user.roles.includes(role)) {
      return true;
    }

    return false;
  }

}
