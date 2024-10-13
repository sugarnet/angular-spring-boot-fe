import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';
import { SharingDataService } from '../services/sharing-data.service';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'user-app',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './user-app.component.html',
})
export class UserAppComponent implements OnInit {
  user!: User;

  constructor(
    private router: Router,
    private sharingDataService: SharingDataService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.login();
  }

  login() {
    this.sharingDataService.loginEventEmitter.subscribe(
      ({ username, password }) => {
        this.authService.login({ username, password }).subscribe({
          next: (response) => {
            const token = response.token;
            const payload = this.authService.getPayload(token);

            const user = { username: payload.sub };
            const login = {
              user,
              isAuth: true,
              isAdmin: payload.isAdmin,
            };

            this.authService.token = token;
            this.authService.user = login;

            this.router.navigate(['/users']);
          },
          error: (error) => {
            if (error.status == 401) {
              console.log(error);
              Swal.fire('Login error', error.error.message, 'error');
            } else {
              throw error;
            }
          },
        });
      }
    );
  }
}
