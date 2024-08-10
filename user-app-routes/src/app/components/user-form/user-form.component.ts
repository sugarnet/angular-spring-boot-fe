import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user';
import { SharingDataService } from '../../services/sharing-data.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'user-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-form.component.html',
})
export class UserFormComponent implements OnInit {
  user: User;

  constructor(
    private route: ActivatedRoute,
    private sharingDataService: SharingDataService,
    private userService: UserService
  ) {
    this.user = new User();
  }
  ngOnInit(): void {
    this.sharingDataService.selectUserEventEmitter.subscribe(
      (user) => (this.user = user)
    );

    this.route.paramMap.subscribe((params) => {
      const id: number = +(params.get('id') || '0');

      if (id > 0) {
        this.sharingDataService.findUserByIdEventEmitter.emit(id);
        //this.userService.findById(id).subscribe(user => this.user = user);
      }
    });
  }

  onSubmit(userForm: NgForm): void {
    if (userForm.valid) {
      console.log(this.user);
      this.sharingDataService.userEventEmitter.emit(this.user);
    }
    userForm.reset();
    userForm.resetForm();
  }

  clear(userForm: NgForm): void {
    this.user = new User();
    userForm.reset();
    userForm.resetForm();
  }
}
