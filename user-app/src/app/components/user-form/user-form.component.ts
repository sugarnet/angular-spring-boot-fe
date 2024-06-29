import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user';

@Component({
  selector: 'user-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-form.component.html'
})
export class UserFormComponent {

  user: User;
  @Output() userEventEmitter: EventEmitter<User> = new EventEmitter();

  constructor() {
    this.user = new User();
  }

  onSubmit(): void {
    console.log(this.user);
    this.userEventEmitter.emit(this.user);
  }
}
