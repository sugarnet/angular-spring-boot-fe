import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../models/user';

@Component({
  selector: 'user-list',
  standalone: true,
  imports: [],
  templateUrl: './user-list.component.html',
})
export class UserListComponent {
  @Input() users: User[] = [];

  @Output() selectedUserEventEmmiter = new EventEmitter();
  @Output() removeUserEventEmmiter = new EventEmitter();

  onSelectedUser(user: User): void {
    this.selectedUserEventEmmiter.emit(user);
  }

  onRemoveUser(id: number): void {
    this.removeUserEventEmmiter.emit(id);
  }
}
