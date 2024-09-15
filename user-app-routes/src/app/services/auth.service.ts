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
    idAdmin: false
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
    return this._user;
  }

  set token(token: string) {
    this._token = token;
    sessionStorage.setItem('token', token);
  }

  get token(): string {
    return this._token!;
  }
}
