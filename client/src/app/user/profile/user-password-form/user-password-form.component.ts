import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { IRootState } from 'src/app/+store';
import {
  updateUserInfoStart,
  updateUserPasswordStart,
} from 'src/app/+store/actions';
import {
  selectUser,
  selectUpdateUserInfoIsLoading,
} from 'src/app/+store/selectors';
import { passwordsMatchValidator } from 'src/app/shared/validators/match-passwords';

@Component({
  selector: 'app-user-password-form',
  templateUrl: './user-password-form.component.html',
  styleUrls: ['./user-password-form.component.css'],
})
export class UserPasswordFormComponent implements OnInit {
  oldPasswordHide = true;
  passwordHide = true;
  rePasswordHide = true;
  @Input() position: 'horizontal' | 'vertical' = 'horizontal';
  @Input() readOnly: boolean = false;
  passwordForm!: FormGroup;
  user$ = this.store.pipe(select(selectUser));
  updateUserInfoIdLoading$ = this.store.pipe(
    select(selectUpdateUserInfoIsLoading)
  );

  constructor(private fb: FormBuilder, private store: Store<IRootState>) {}

  ngOnInit(): void {
    this.passwordForm = this.fb.group(
      {
        oldPassword: ['', [Validators.required, Validators.minLength(6)]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        repeatPassword: ['', [Validators.required]],
      },
      { validators: passwordsMatchValidator() }
    );
  }

  onSubmit() {
    // if (this.passwordForm.invalid) {
    //   return;
    // }
    const { oldPassword, password, repeatPassword } = this.passwordForm.value;
    this.store.dispatch(
      updateUserPasswordStart({ oldPassword, password, repeatPassword })
    );
  }
}
