import { Component, OnDestroy, OnInit } from "@angular/core";
import { UntypedFormGroup, UntypedFormBuilder, Validators } from "@angular/forms";
import { select, Store } from "@ngrx/store";

import { IRootState } from "src/app/+store";
import { loginStart, loginClearError } from "src/app/+store/auth/actions";
import { selectIsLoading } from "src/app/+store/auth/selectors";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["../../shared/styles/login-register.css", "./login.component.css"],
})
export class LoginComponent implements OnInit, OnDestroy {
  form!: UntypedFormGroup;
  loginLogoPath = "./../../../assets/images/login.png";
  passwordHide = true;
  rePasswordHide = true;
  isLoading$ = this.store.pipe(select(selectIsLoading));

  constructor(private fb: UntypedFormBuilder, private store: Store<IRootState>) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
    });
  }

  submitHandler(): void {
    if (this.form.invalid) {
      return;
    }
    this.store.dispatch(loginStart(this.form.value));
  }

  ngOnDestroy(): void {
    this.store.dispatch(loginClearError());
  }
}
