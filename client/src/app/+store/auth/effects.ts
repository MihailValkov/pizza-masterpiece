import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, map, switchMap, takeUntil } from "rxjs";
import { Actions, createEffect, ofType } from "@ngrx/effects";

import { ILoginUser, IRegisterUser, IUser } from "../../shared/interfaces/user";
import { AuthService } from "../../core/auth.service";
import { IErrorResponse } from "../../shared/interfaces/error-response";
import { NotificationService } from "../../core/notification.service";
import { rateOrdererProductSuccess } from "src/app/orders/+store/actions";
import * as authActions from "./actions";

type FailureActions =
  | typeof authActions.loginFailure
  | typeof authActions.registerFailure
  | typeof authActions.authenticateFailure
  | typeof authActions.updateUserImageFailure
  | typeof authActions.updateUserInfoFailure
  | typeof authActions.updateUserAddressFailure
  | typeof authActions.updateUserPasswordFailure;

@Injectable()
export class AuthEffects {

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authActions.loginStart),
      switchMap((data: ILoginUser) =>
        this.authService.login(data).pipe(
          takeUntil(this.actions$.pipe(ofType(authActions.loginCancel))),
          map((user: IUser) => {
            this.notificationService.showMessage("You are successfully logged in!", "success");
            this.router.navigateByUrl("/");
            return authActions.loginSuccess({ user });
          }),
          catchError(err => this.catchErrorMessage(err, authActions.loginFailure))
        )
      )
    );
  });

  register$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authActions.registerStart),
      switchMap((data: IRegisterUser) =>
        this.authService.register(data).pipe(
          takeUntil(this.actions$.pipe(ofType(authActions.registerCancel))),
          map((user: IUser) => {
            this.notificationService.showMessage(
              "Thanks for signing up. Your account has been created and successfully logged in!",
              "success"
            );
            this.router.navigateByUrl("/");
            return authActions.registerSuccess({ user });
          }),
          catchError(err => this.catchErrorMessage(err, authActions.registerFailure))
        )
      )
    );
  });

  authenticate$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authActions.authenticateStart),
      switchMap(() => {
        return this.authService.authenticate().pipe(
          takeUntil(this.actions$.pipe(ofType(authActions.authenticateCancel))),
          map((user: IUser) => authActions.authenticateSuccess({ user })),
          catchError(() => [authActions.authenticateFailure()])
        );
      })
    );
  });

  logout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authActions.logoutStart),
      switchMap(() =>
        this.authService.logout().pipe(
          map(() => {
            this.notificationService.showMessage("You are successfully logged out!", "success");
            this.router.navigateByUrl("/");
            return authActions.logoutSuccess();
          })
        )
      )
    );
  });

  updateUserImage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.updateUserImageStart),
      switchMap(({ formData }) =>
        this.authService.updateUserImage(formData).pipe(
          takeUntil(this.actions$.pipe(ofType(authActions.updateUserImageCancel))),
          map(image => {
            this.notificationService.showMessage("Your image has been changed successfully!", "success");
            return authActions.updateUserImageSuccess({ image });
          }),
          catchError(err => this.catchErrorMessage(err, authActions.updateUserImageFailure))
        )
      )
    )
  );

  updateUserInfo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.updateUserInfoStart),
      switchMap(userInfo =>
        this.authService.updateUserInfo(userInfo).pipe(
          takeUntil(this.actions$.pipe(ofType(authActions.updateUserInfoCancel))),
          map(userInfo => {
            this.notificationService.showMessage("Your personal information has been changed successfully!", "success");
            return authActions.updateUserInfoSuccess({ userInfo });
          }),
          catchError(err => this.catchErrorMessage(err, authActions.updateUserInfoFailure))
        )
      )
    )
  );

  updateUserAddress$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.updateUserAddressStart),
      switchMap(userAddress =>
        this.authService.updateUserAddress(userAddress).pipe(
          takeUntil(this.actions$.pipe(ofType(authActions.updateUserAddressCancel))),
          map(userAddress => {
            this.notificationService.showMessage("Your delivery address has been changed successfully!", "success");
            return authActions.updateUserAddressSuccess({ userAddress });
          }),
          catchError(err => this.catchErrorMessage(err, authActions.updateUserAddressFailure))
        )
      )
    )
  );

  updateUserPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.updateUserPasswordStart),
      switchMap(userPassword =>
        this.authService.updateUserPassword(userPassword).pipe(
          takeUntil(this.actions$.pipe(ofType(authActions.updateUserPasswordCancel))),
          map(({ message }) => {
            this.notificationService.showMessage(message, "success");
            return authActions.updateUserPasswordSuccess();
          }),
          catchError(err => this.catchErrorMessage(err, authActions.updateUserPasswordFailure))
        )
      )
    )
  );

  rateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(rateOrdererProductSuccess),
      map(({ productId }) => authActions.rateProductSuccess({ productId }))
    )
  );

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
    private actions$: Actions,
    private router: Router
  ) {}

  private catchErrorMessage(err: IErrorResponse, action: FailureActions) {
    const message = err.error.message;
    this.notificationService.showMessage(message, "error");
    return [action({ message })];
  }
}
