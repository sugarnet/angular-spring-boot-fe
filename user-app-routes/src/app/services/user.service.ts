import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: User[] = [];

  constructor(private http: HttpClient) { }

  findAll(): Observable<User[]> {
    /*return this.http.get('http://localhost:8080/api/users').pipe(
      map((users: any) => users as User[]),
    );*/
    return this.http.get<User[]>('http://localhost:8080/api/users');
  }
}