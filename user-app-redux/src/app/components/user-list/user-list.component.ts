import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { User } from '../../models/user';
import { SharingDataService } from '../../services/sharing-data.service';
import { UserService } from '../../services/user.service';
import { PaginatorComponent } from '../paginator/paginator.component';
import { AuthService } from '../../services/auth.service';
import { Store } from '@ngrx/store';
import { load, remove } from '../../store/users/users.actions';
import Swal from 'sweetalert2';

@Component({
  selector: 'user-list',
  standalone: true,
  imports: [RouterModule, PaginatorComponent],
  templateUrl: './user-list.component.html',
})
export class UserListComponent implements OnInit {
  title: string = 'Users List';
  users: User[] = [];
  paginator: any = {};

  constructor(
    private store: Store<{ users: any }>,
    private userService: UserService,
    private sharingDataService: SharingDataService,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.store.select('users').subscribe((state) => {
      this.users = state.users;
      this.paginator = state.paginator;
    });
  }
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) =>
      this.store.dispatch(load({ page: +(params.get('page') || '0') }))
    );
  }

  onSelectedUser(user: User): void {
    this.router.navigate(['/users/edit', user.id]);
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
        this.store.dispatch(remove({ id }));
      }
    });
  }

  get admin(): boolean {
    return this.authService.isAdmin();
  }
}
