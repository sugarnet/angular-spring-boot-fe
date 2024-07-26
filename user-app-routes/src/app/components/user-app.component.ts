import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { NavbarComponent } from './navbar/navbar.component';
import { SharingDataService } from '../services/sharing-data.service';

@Component({
  selector: 'user-app',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './user-app.component.html',
})
export class UserAppComponent implements OnInit {

  users: User[] = [];

  constructor(private router: Router, private userService: UserService, private sharingDataService: SharingDataService) {
  }

  ngOnInit(): void {
    this.userService.findAll().subscribe((users) => (this.users = users));
    this.addUser();
    this.onRemoveUser();
    this.findUserById();
  }

  findUserById() {

    this.sharingDataService.findUserByIdEventEmitter.subscribe(id => {
      const user = this.users.find(user => user.id == id);

      this.sharingDataService.selectUserEventEmitter.emit(user);
    });
  }

  addUser() {
    this.sharingDataService.userEventEmitter.subscribe(user => {

      if (user.id > 0) {
        this.users = this.users.map((u) => (u.id == user.id ? { ...user } : u));
      } else {
        this.users = [...this.users, { ...user, id: new Date().getTime() }];
      }
      this.router.navigate(['/users'], { state: { users: this.users } });
      Swal.fire({
        title: "User saved!",
        text: "The user was saved!",
        icon: "success"
      });
    });
  }

  onRemoveUser(): void {
    this.sharingDataService.removeUserEventEmmiter.subscribe(id => {
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
          this.router.navigate(['/users/create'], { skipLocationChange: true }).then(() => {
            this.router.navigate(['/users'], { state: { users: this.users } });
          });
          Swal.fire({
            title: 'Removed!',
            text: 'Your user has been removed.',
            icon: 'success',
          });
        }
      });
    });
  }

}
