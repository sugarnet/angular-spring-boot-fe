import { Component, Input } from '@angular/core';
import { User } from '../../models/user';

@Component({
  selector: 'user-list',
  standalone: true,
  imports: [],
  templateUrl: './user-list.component.html'
})
export class UserListComponent {

  @Input() users: User[] = []; 
}
