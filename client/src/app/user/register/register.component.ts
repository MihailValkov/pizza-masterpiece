import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';

import { IRootState } from 'src/app/+store';
import { registerStart, registerClearError } from 'src/app/+store/actions';
import { selectIsLoading } from 'src/app/+store/selectors';
import { passwordsMatchValidator } from 'src/app/shared/validators/match-passwords';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [
    '../../shared/styles/login-register.css',
    './register.component.css',
  ],
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  registerLogoPath = './../../../assets/images/register.png';
  passwordHide = true;
  rePasswordHide = true;
  isLoading$ = this.store.pipe(select(selectIsLoading));

  constructor(private fb: FormBuilder, private store: Store<IRootState>) {}

  ngOnInit(): void {
    this.form = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        repeatPassword: ['', [Validators.required]],
      },
      { validators: passwordsMatchValidator() }
    );
  }

  submitHandler(): void {
    if (this.form.invalid) {
      return;
    }
    this.store.dispatch(registerStart(this.form.value));
  }

  ngOnDestroy(): void {
    this.store.dispatch(registerClearError());
  }
}
