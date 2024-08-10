import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../models/user';
import { SharingDataService } from '../../services/sharing-data.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'user-list',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './user-list.component.html',
})
export class UserListComponent implements OnInit {
  title: string = 'Users List';
  users: User[] = [];

  constructor(
    private userService: UserService,
    private sharingDataService: SharingDataService,
    private router: Router
  ) {
    if (this.router.getCurrentNavigation()?.extras.state) {
      this.users = this.router.getCurrentNavigation()?.extras.state!['users'];
    }
  }
  ngOnInit(): void {
    if (this.users == undefined || this.users == null || this.users.length == 0) {
      console.log('calling findAll...');
      this.userService.findAll().subscribe((users) => (this.users = users));
    }
  }

  onSelectedUser(user: User): void {
    this.router.navigate(['/users/edit', user.id]);
  }

  onRemoveUser(id: number): void {
    this.sharingDataService.removeUserEventEmmiter.emit(id);
  }
}
