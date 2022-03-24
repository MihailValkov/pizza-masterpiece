import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';

import { IRootState } from 'src/app/+store';
import { registerStart, registerClearError } from 'src/app/+store/actions';
import { selectIsLoading, selectErrorMessage } from 'src/app/+store/selectors';

import { SnackBarComponent } from 'src/app/shared/snack-bar/snack-bar.component';

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
  subscription!: Subscription;
  
  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private store: Store<IRootState>
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repeatPassword: [''],
    });

    this.subscription = this.errorMessage$.subscribe(
      (err) => err && this.showErrorMessage(err)
    );
  }

  submitHandler(): void {
    if (this.form.invalid) {
      return;
    }
    this.store.dispatch(registerStart(this.form.value));
  }

  showErrorMessage(message: string): void {
    this.snackBar.openFromComponent(SnackBarComponent, {
      data: {
        message,
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
