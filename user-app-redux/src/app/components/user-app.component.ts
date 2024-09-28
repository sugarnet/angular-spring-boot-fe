import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { NavbarComponent } from './navbar/navbar.component';
import { SharingDataService } from '../services/sharing-data.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'user-app',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './user-app.component.html',
})
export class UserAppComponent implements OnInit {
  users: User[] = [];
  paginator: any = {};

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private sharingDataService: SharingDataService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // this.userService.findAll().subscribe((users) => (this.users = users));
    // this.activatedRoute.paramMap.subscribe(params => {
    //   const page = +(params.get('page') || '0');
    //   console.log(page);
    //   this.userService.findAllPageable(page).subscribe((pageable) => (this.users = pageable.content as User[]));
    // });
    this.addUser();
    this.onRemoveUser();
    this.findUserById();
    this.pageUsersEvent();
    this.login();
  }

  login() {
    this.sharingDataService.loginEventEmitter.subscribe(({username, password}) => {
      console.log(username + ' ' + password);
      this.authService.login({username, password}).subscribe({
        next: response => {
          const token =  response.token;
          console.log(token);
          const payload = this.authService.getPayload(token);
          console.log(payload);

          const user = {username: payload.sub};
          const login = {
            user,
            isAuth: true,
            isAdmin: payload.isAdmin
          };

          this.authService.token = token;
          this.authService.user = login;
          
          this.router.navigate(['/users']);
        },
        error: error => {
          if (error.status == 401) {
            console.log(error);
            Swal.fire('Login error', error.error.message, 'error');
          } else {
            throw error;
          }
        }
      });
    });
  }

  pageUsersEvent() {
    this.sharingDataService.pageUsersEventEmitter.subscribe((result) => {
      this.users = result.users;
      this.paginator = result.paginator;
    });
  }

  findUserById() {
    this.sharingDataService.findUserByIdEventEmitter.subscribe((id) => {
      const user = this.users.find((user) => user.id == id);

      this.sharingDataService.selectUserEventEmitter.emit(user);
    });
  }

  addUser() {
    this.sharingDataService.userEventEmitter.subscribe((user) => {
      if (user.id > 0) {
        this.userService.update(user).subscribe({
          next: (userUpdated) => {
            this.users = this.users.map((u) =>
              u.id == userUpdated.id ? { ...userUpdated } : u
            );
            this.router.navigate(['/users'], {
              state: { users: this.users, paginator: this.paginator },
            });
            Swal.fire({
              title: 'User saved!',
              text: 'The user was saved!',
              icon: 'success',
            });
          },
          error: (err) => {
            // console.log(err.error);
            if (err.status == 400) {
              this.sharingDataService.errorsUserFormEventEmitter.emit(
                err.error
              );
            }
          },
        });
      } else {
        this.userService.create(user).subscribe({
          next: (userCreated) => {
            this.users = [...this.users, { ...userCreated }];
            this.router.navigate(['/users'], { state: { users: this.users, paginator: this.paginator } });
            Swal.fire({
              title: 'User saved!',
              text: 'The user was saved!',
              icon: 'success',
            });
          },
          error: (err) => {
            // console.log(err.error);
            if (err.status == 400) {
              this.sharingDataService.errorsUserFormEventEmitter.emit(
                err.error
              );
            }
          },
        });
      }
    });
  }

  onRemoveUser(): void {
    this.sharingDataService.removeUserEventEmmiter.subscribe((id) => {
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
          this.userService.remove(id).subscribe(() => {
            this.users = this.users.filter((user) => user.id != id);
            this.router
              .navigate(['/users/create'], { skipLocationChange: true })
              .then(() => {
                this.router.navigate(['/users'], {
                  state: { users: this.users, paginator: this.paginator },
                });
              });
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
