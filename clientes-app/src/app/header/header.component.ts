import { Component } from "@angular/core";
import { AuthService } from "../users/auth.service";
import { Router } from "@angular/router";
import Swal from "sweetalert2";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {
    title: string = 'App Angular'

    constructor(public authService: AuthService, private router: Router) {

    }

    logout(): void {
        Swal.fire('Logout', `${this.authService.user.username} has cerrado sesión!`, 'success');
        this.authService.logout();
        this.router.navigate(['/login']);
    }
}