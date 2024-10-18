import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import Swal from 'sweetalert2';
import { User } from '../../models/user';
import { login } from '../../store/auth/auth.actions';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  public user: User;

  constructor(private store: Store<{ auth: any }>) {
    this.user = new User();
  }

  ngSubmit() {
    if (!this.user.username || !this.user.password) {
      Swal.fire('Login error!', "Username or Password can't be empty", 'error');
    } else {
      this.store.dispatch(login({ username: this.user.username, password: this.user.password }));
    }
  }
}
