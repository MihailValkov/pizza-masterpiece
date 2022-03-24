import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { of } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  passwordHide = true;
  rePasswordHide = true;

  isLoading$ = of(false);
  errorMessage$ = of('')

  constructor(
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  submitHandler(): void {
    if (this.form.invalid) {
      return;
    }
  }

  showErrorMessage(message: string): void {
  }

  ngOnDestroy(): void {

  }
}
