import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { combineLatest, Subscription } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';

import { IRootState } from 'src/app/+store';
import { registerStart, registerClearError } from 'src/app/+store/actions';
import {
  selectIsLoading,
  selectErrorMessage,
  selectSuccess,
} from 'src/app/+store/selectors';

import { SnackBarComponent } from 'src/app/shared/snack-bar/snack-bar.component';
import { passwordsMatchValidator } from 'src/app/shared/validators/match-passwords';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  passwordHide = true;
  rePasswordHide = true;

  isLoading$ = this.store.pipe(select(selectIsLoading));
  errorMessage$ = this.store.pipe(select(selectErrorMessage));
  success$ = this.store.pipe(select(selectSuccess));
  subscription: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private store: Store<IRootState>
  ) {
    this.snackBar.dismiss();
  }

  ngOnInit(): void {
    this.form = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        repeatPassword: ['', [Validators.required]],
      },
      { validators: passwordsMatchValidator() }
    );

    this.subscription.add(
      combineLatest([this.errorMessage$, this.success$]).subscribe(
        ([err, success]) => {
          if (err) {
            this.showMessage(err, 'error');
          } else if (success) {
            this.showMessage('Register is successfully!', 'success');
          }
        }
      )
    );
  }

  submitHandler(): void {
    if (this.form.invalid) {
      return;
    }
    this.store.dispatch(registerStart(this.form.value));
  }

  showMessage(message: string, status: 'error' | 'success'): void {
    this.snackBar.openFromComponent(SnackBarComponent, {
      data: {
        message,
        status,
        action: 'Close',
      },
      duration: 3000,
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.store.dispatch(registerClearError());
    }
  }
}
