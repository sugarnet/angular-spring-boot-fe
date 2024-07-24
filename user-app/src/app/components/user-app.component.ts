import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'user-app',
  standalone: true,
  imports: [UserListComponent, UserFormComponent],
  templateUrl: './user-app.component.html',
})
export class UserAppComponent implements OnInit {
  title: string = 'Users List';
  users: User[] = [];
  userSelected: User;
  open: boolean = false;

  constructor(private userService: UserService) {
    this.userSelected = new User();
  }

  ngOnInit(): void {
    this.userService.findAll().subscribe((users) => (this.users = users));
  }

  addUser(user: User) {
    if (user.id > 0) {
      this.users = this.users.map((u) => (u.id == user.id ? { ...user } : u));
    } else {
      this.users = [...this.users, { ...user, id: new Date().getTime() }];
    }
    this.userSelected = new User();
    Swal.fire({
      title: "User saved!",
      text: "The user was saved!",
      icon: "success"
    });
    this.setOpen();
  }

  onRemoveUser(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.users = this.users.filter((user) => user.id != id);
        Swal.fire({
          title: 'Removed!',
          text: 'Your user has been removed.',
          icon: 'success',
        });
      }
    });
  }

  selectedUser(userRow: User): void {
    this.userSelected = { ...userRow };
    this.open = true;
  }

  setOpen(): void {
    this.open = !this.open;
  }
}
