import { Component, Input } from '@angular/core';
import { UserFormService } from '../user-form.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent {
  @Input() width: number = 50;
  @Input() hideActions: boolean = false;
  userForm$ = this.userFormService.userForm$;
  isFormFulfilled = this.userFormService.formIsFulfilled;

  constructor(private userFormService: UserFormService) {}

  setFormValue() {
    this.userFormService.setUserFormValue();
  }
}
