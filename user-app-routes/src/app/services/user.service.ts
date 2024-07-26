import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: User[] = [{
    id: 1,
    name: 'Diego',
    lastname: 'Scifo',
    email: 'diego@mail.com',
    username: 'dscifo',
    password: '123456'
  },{
    id: 2,
    name: 'Sol',
    lastname: 'Mauna',
    email: 'sol@mail.com',
    username: 'smauna',
    password: '123456'
  }]

  constructor() { }

  findAll(): Observable<User[]> {
    return of(this.users);
  }
}
