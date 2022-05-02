import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { IRootState } from 'src/app/+store';
import { updateUserInfoStart } from 'src/app/+store/actions';
import { selectUpdateUserInfoIsLoading, selectUser } from 'src/app/+store/selectors';

@Component({
  selector: 'app-user-info-form',
  templateUrl: './user-info-form.component.html',
  styleUrls: ['./user-info-form.component.css'],
})
export class UserInfoFormComponent implements OnInit {
  @Input() position: 'horizontal' | 'vertical' = 'horizontal';
  @Input() readOnly: boolean = false;
  userForm!: FormGroup;
  user$ = this.store.pipe(select(selectUser));
  updateUserInfoIdLoading$ = this.store.pipe(select(selectUpdateUserInfoIsLoading))

  constructor(private fb: FormBuilder, private store: Store<IRootState>) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern(/^0[1-9]{1}[0-9]{8}$/)],
      ],
    });
    this.user$.subscribe((user) => {
      this.userForm.setValue({
        firstName: user?.firstName,
        lastName: user?.lastName,
        email: user?.email,
        phoneNumber: user?.phoneNumber,
      });
    });
  }

  onSubmit() {
    if (this.userForm.invalid) {
      return;
    }
    const { firstName, lastName, phoneNumber } = this.userForm.value;
    this.store.dispatch(updateUserInfoStart({ firstName, lastName, phoneNumber }));
  }
}
