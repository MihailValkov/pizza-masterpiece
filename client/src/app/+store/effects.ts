import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, switchMap, takeUntil } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { ILoginUser, IRegisterUser, IUser } from '../shared/interfaces/user';
import { AuthService } from '../core/auth.service';
import * as authActions from './actions';

interface IErrorResponse {
  error: { message: string };
}

@Injectable()
export class AuthEffect {
  login = createEffect(() => {
    return this.actions$.pipe(
      ofType(authActions.loginStart),
      switchMap((data: ILoginUser) =>
        this.authService.login(data).pipe(
          takeUntil(this.actions$.pipe(ofType(authActions.loginCancel))),
          map((user: IUser) => {
            this.router.navigateByUrl('/');
            return authActions.loginSuccess({ user });
          }),
          catchError((err: IErrorResponse) => [
            authActions.loginFailure({ message: err.error.message }),
          ])
        )
      )
    );
  });

  register = createEffect(() => {
    return this.actions$.pipe(
      ofType(authActions.registerStart),
      switchMap((data: IRegisterUser) =>
        this.authService.register(data).pipe(
          takeUntil(this.actions$.pipe(ofType(authActions.registerCancel))),
          map((user: IUser) => {
            this.router.navigateByUrl('/');
            return authActions.registerSuccess({ user });
          }),
          catchError((err: IErrorResponse) => [
            authActions.registerFailure({ message: err.error.message }),
          ])
        )
      )
    );
  });

  authenticate = createEffect(() => {
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

  constructor(
    private authService: AuthService,
    private actions$: Actions,
    private router: Router
  ) {}
}
