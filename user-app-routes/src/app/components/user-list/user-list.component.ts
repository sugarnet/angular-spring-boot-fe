import { Component, EventEmitter } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { SharingDataService } from '../../services/sharing-data.service';

@Component({
  selector: 'user-list',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './user-list.component.html',
})
export class UserListComponent {
  title: string = 'Users List';
  users: User[] = [];

  constructor(private userService: UserService, private sharingDataService: SharingDataService, private router: Router) {
    if (this.router.getCurrentNavigation()?.extras.state) {
      this.users = this.router.getCurrentNavigation()?.extras.state!['users'];
    } else {
      this.userService.findAll().subscribe(users => this.users = users);
    }
  }

  onSelectedUser(user: User): void {
    this.router.navigate(['/users/edit', user.id], {state: {user}});
  }

  onRemoveUser(id: number): void {
    this.sharingDataService.removeUserEventEmmiter.emit(id);
  }
}
