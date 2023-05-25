import { Component, OnInit } from '@angular/core';
import { User } from './user';
import Swal from 'sweetalert2';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  title: string = 'Por favor inicie sesión';
  user: User;

  constructor(private authService: AuthService, private router: Router) {
    this.user = new User();
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      Swal.fire('Login', `Hola ${this.authService.user.username} ya estás autenticado!`, 'info');
      this.router.navigate(['/clientes']);
    }
  }

  login(): void {
    console.log(this.user);
    if (this.user.username == null || this.user.password == null) {
      Swal.fire('Error Login', 'El usuario o la contraseña no pueden estar vacíos', 'error');
      return;
    }

    this.authService.login(this.user).subscribe(response => {
      console.log(response);

      this.authService.saveUser(response.access_token);
      this.authService.saveToken(response.access_token);

      let user = this.authService.user;

      this.router.navigate(['/clientes']);
      Swal.fire('Login exitoso', `Hola ${user.name} ${user.lastname}!`, 'success');
    }, error => {
      if (error.status == 400) {
        Swal.fire('Error Login', `Usuario o Contraseña incorrecta!`, 'error');
      }
    });
  }

}
