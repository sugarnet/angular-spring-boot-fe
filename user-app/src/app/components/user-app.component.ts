import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';

@Component({
  selector: 'user-app',
  standalone: true,
  imports: [UserListComponent, UserFormComponent],
  templateUrl: './user-app.component.html',
})
export class UserAppComponent implements OnInit {
  title: string = 'Users List';
  users: User[] = [];

  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.userService.findAll().subscribe((users) => (this.users = users));
  }

  addUser(user: User) {
    this.users = [...this.users, { ...user, id: new Date().getTime() }];
  }
}
