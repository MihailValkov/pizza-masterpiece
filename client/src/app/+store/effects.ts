import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, switchMap, takeUntil } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { ILoginUser, IRegisterUser, IUser } from '../shared/interfaces/user';
import { AuthService } from '../core/auth.service';
import * as authActions from './actions';
import { IErrorResponse } from '../shared/interfaces/error-response';
import { NotificationService } from '../core/notification.service';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authActions.loginStart),
      switchMap((data: ILoginUser) =>
        this.authService.login(data).pipe(
          takeUntil(this.actions$.pipe(ofType(authActions.loginCancel))),
          map((user: IUser) => {
            this.notificationService.showMessage(
              'Your image has been changed successfully!',
              'success'
            );
            this.router.navigateByUrl('/');
            return authActions.loginSuccess({ user });
          }),
          catchError((err: IErrorResponse) => {
            const message = err.error.message;
            this.notificationService.showMessage(message, 'error');
            return [authActions.loginFailure({ message: err.error.message })];
          })
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
              'Thanks for signing up. Your account has been created.',
              'success'
            );
            this.router.navigateByUrl('/');
            return authActions.registerSuccess({ user });
          }),
          catchError((err: IErrorResponse) => {
            const message = err.error.message;
            this.notificationService.showMessage(message, 'error');
            return [
              authActions.registerFailure({ message: err.error.message }),
            ];
          })
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
            this.notificationService.showMessage(
              'Logout successfully!',
              'success'
            );
            this.router.navigateByUrl('/');
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
          takeUntil(
            this.actions$.pipe(ofType(authActions.updateUserImageCancel))
          ),
          map((image) => {
            this.notificationService.showMessage(
              'Your image has been changed successfully!',
              'success'
            );
            return authActions.updateUserImageSuccess({ image });
          }),
          catchError((err: IErrorResponse) => {
            const message = err.error.message;
            this.notificationService.showMessage(message, 'error');
            return [
              authActions.updateUserImageFailure({
                message,
              }),
            ];
          })
        )
      )
    )
  );

  updateUserInfo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.updateUserInfoStart),
      switchMap((userInfo) =>
        this.authService.updateUserInfo(userInfo).pipe(
          takeUntil(
            this.actions$.pipe(ofType(authActions.updateUserInfoCancel))
          ),
          map((userInfo) => {
            this.notificationService.showMessage(
              'Your personal information has been changed successfully!',
              'success'
            );
            return authActions.updateUserInfoSuccess({ userInfo });
          }),
          catchError((err: IErrorResponse) => {
            const message = err.error.message;
            this.notificationService.showMessage(message, 'error');
            return [
              authActions.updateUserInfoFailure({
                message,
              }),
            ];
          })
        )
      )
    )
  );

  updateUserAddress$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.updateUserAddressStart),
      switchMap((userAddress) =>
        this.authService.updateUserAddress(userAddress).pipe(
          takeUntil(
            this.actions$.pipe(ofType(authActions.updateUserAddressCancel))
          ),
          map((userAddress) => {
            this.notificationService.showMessage(
              'Your address has been changed successfully!',
              'success'
            );
            return authActions.updateUserAddressSuccess({ userAddress });
          }),
          catchError((err: IErrorResponse) => {
            const message = err.error.message;
            this.notificationService.showMessage(message, 'error');
            return [
              authActions.updateUserAddressFailure({
                message,
              }),
            ];
          })
        )
      )
    )
  );

  updateUserPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.updateUserPasswordStart),
      switchMap((userPassword) =>
        this.authService.updateUserPassword(userPassword).pipe(
          takeUntil(
            this.actions$.pipe(ofType(authActions.updateUserPasswordCancel))
          ),
          map(({ message }) => {
            this.notificationService.showMessage(message, 'success');
            return authActions.updateUserPasswordSuccess();
          }),
          catchError((err: IErrorResponse) => {
            const message = err.error.message;
            this.notificationService.showMessage(message, 'error');
            return [
              authActions.updateUserPasswordFailure({
                message,
              }),
            ];
          })
        )
      )
    )
  );

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
    private actions$: Actions,
    private router: Router
  ) {}
}
