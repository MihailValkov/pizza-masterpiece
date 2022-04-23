import { Component } from '@angular/core';
import { UserFormService } from '../user-form.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent {
  userForm$ = this.userFormService.userForm$;

  constructor(private userFormService: UserFormService) {}

  setFormValue() {
    this.userFormService.setUserFormValue();
  }
}
