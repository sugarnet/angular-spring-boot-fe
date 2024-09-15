import { Component } from '@angular/core';
import { User } from '../../models/user';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { SharingDataService } from '../../services/sharing-data.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  public user: User;

  constructor(private sharingDataService: SharingDataService) {
    this.user = new User();
  }

  ngSubmit() {
    if (!this.user.username || !this.user.password) {
      Swal.fire('Login error!', "Username or Password can't be empty", 'error');
    } else {
      this.sharingDataService.loginEventEmitter.emit({
        username: this.user.username,
        password: this.user.password,
      });
    }
  }
}
