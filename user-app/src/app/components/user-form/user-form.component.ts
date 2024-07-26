import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../models/user';

@Component({
  selector: 'user-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-form.component.html'
})
export class UserFormComponent {

  @Input() user: User;

  @Output() userEventEmitter: EventEmitter<User> = new EventEmitter();
  @Output() openEventEmitter = new EventEmitter();

  constructor() {
    this.user = new User();
  }

  onSubmit(userForm: NgForm): void {
    if (userForm.valid) {
      console.log(this.user);
      this.userEventEmitter.emit(this.user);
    }
    userForm.reset();
    userForm.resetForm();
  }

  clear(userForm: NgForm): void {
    this.user = new User();
    userForm.reset();
    userForm.resetForm();
  }

  onOpenClose(): void {
    this.openEventEmitter.emit();
  }
}
