import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { User } from '../../models/user';
import { SharingDataService } from '../../services/sharing-data.service';
import { UserService } from '../../services/user.service';
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

  constructor(
    private userService: UserService,
    private sharingDataService: SharingDataService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    if (this.router.getCurrentNavigation()?.extras.state) {
      this.users = this.router.getCurrentNavigation()?.extras.state!['users'];
      this.paginator = this.router.getCurrentNavigation()?.extras.state!['paginator'];
    }
  }
  ngOnInit(): void {
    if (
      this.users == undefined ||
      this.users == null ||
      this.users.length == 0
    ) {
      console.log('calling findAll...');
      // this.userService.findAll().subscribe((users) => (this.users = users));

      this.activatedRoute.paramMap.subscribe((params) => {
        const page = +(params.get('page') || '0');
        console.log(page);
        this.userService.findAllPageable(page).subscribe((pageable) => {
          this.users = pageable.content as User[];
          this.paginator = pageable;
          this.sharingDataService.pageUsersEventEmitter.emit({
            users: this.users,
            paginator: this.paginator,
          });
        });
      });
    }
  }

  onSelectedUser(user: User): void {
    this.router.navigate(['/users/edit', user.id]);
  }

  onRemoveUser(id: number): void {
    this.sharingDataService.removeUserEventEmmiter.emit(id);
  }
}
