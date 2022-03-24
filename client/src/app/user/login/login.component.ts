import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import {
  combineLatest,
  combineLatestAll,
  map,
  merge,
  mergeAll,
  of,
  Subscription,
  switchMap,
  zip,
} from 'rxjs';
import { select, Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';

import { IRootState } from 'src/app/+store';
import { loginStart, loginClearError } from 'src/app/+store/actions';
import {
  selectIsLoading,
  selectErrorMessage,
  selectSuccess,
} from 'src/app/+store/selectors';

import { SnackBarComponent } from 'src/app/shared/snack-bar/snack-bar.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
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
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    this.subscription.add(
      combineLatest([this.errorMessage$, this.success$]).subscribe(
        ([err, success]) => {
          if (err) {
            this.showMessage(err, 'error');
          } else if (success) {
            this.showMessage('Login is successfully!', 'success');
          }
        }
      )
    );
  }

  submitHandler(): void {
    if (this.form.invalid) {
      return;
    }
    this.store.dispatch(loginStart(this.form.value));
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
      this.store.dispatch(loginClearError());
    }
  }
}
