import { Injectable } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BehaviorSubject, Observable, of } from 'rxjs';

export interface IUserForm {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

@Injectable()
export class UserFormService {
  private userForm: BehaviorSubject<FormGroup> = new BehaviorSubject(
    this.initForm()
  );
  userForm$: Observable<FormGroup> = this.userForm.asObservable();

  constructor(private fb: FormBuilder) {}

  initForm() {
    return this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern(/^0[1-9]{1}[0-9]{8}$/)],
      ],
    });
  }

  setUserFormValue() {
    this.userForm.next(this.userForm.getValue());
  }

}
