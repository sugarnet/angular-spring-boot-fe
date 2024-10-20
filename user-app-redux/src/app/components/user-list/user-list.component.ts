import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import Swal from 'sweetalert2';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { load, remove } from '../../store/users/users.actions';
import { PaginatorComponent } from '../paginator/paginator.component';

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
  loading: boolean = true;

  constructor(
    private store: Store<{ users: any }>,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.store.select('users').subscribe((state) => {
      this.users = state.users;
      this.paginator = state.paginator;
      this.loading = state.loading;
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
