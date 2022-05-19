import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, switchMap, takeUntil, map } from 'rxjs';
import { NotificationService } from 'src/app/core/notification.service';
import { IErrorResponse } from 'src/app/shared/interfaces/error-response';
import { AdminService } from '../../admin.service';
import * as usersActions from './actions';

@Injectable()
export class AdminUsersEffects {
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(usersActions.loadUsersStart),
      switchMap(({ page, limit, sort, order, searchValue, selectValue }) =>
        this.adminService
          .loadUsers(page, limit, sort, order, searchValue, selectValue)
          .pipe(
            takeUntil(this.actions$.pipe(ofType(usersActions.loadUsersCancel))),
            map(({ users, count, roles, accountStatuses }) => {
              this.router.navigateByUrl(
                `/admin/users?page=${
                  page + 1
                }&limit=${limit}&sort=${sort}&order=${order}&searchValue=${searchValue}&selectValue=${selectValue}`
              );
              return usersActions.loadUsersSuccess({
                users,
                count,
                roles,
                accountStatuses,
              });
            }),
            catchError(({ error }: IErrorResponse) => {
              const message = error.message;
              this.notificationService.showMessage(message, 'error');
              return [usersActions.loadUsersFailure({ message })];
            })
          )
      )
    )
  );

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(usersActions.loadUserStart),
      switchMap(({ userId }) =>
        this.adminService.loadUser(userId).pipe(
          takeUntil(this.actions$.pipe(ofType(usersActions.loadUserCancel))),
          map(({ user }) => {
            return usersActions.loadUserSuccess({ user });
          }),
          catchError(({ error }: IErrorResponse) => {
            const message = error.message;
            this.notificationService.showMessage(message, 'error');
            return [usersActions.loadUserFailure({ message })];
          })
        )
      )
    )
  );

  changeUserAccountSettings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(usersActions.changeUserAccountSettingsStart),
      switchMap(({ userId, role, accountStatus }) =>
        this.adminService
          .changeUserAccountSettings(userId, role, accountStatus)
          .pipe(
            takeUntil(
              this.actions$.pipe(
                ofType(usersActions.changeUserAccountSettingsCancel)
              )
            ),
            map(({ role, accountStatus, email }) => {
              this.notificationService.showMessage(
                `The account of user with email "${email}" has been updated.`,
                'success'
              );
              return usersActions.changeUserAccountSettingsSuccess({
                role,
                accountStatus,
              });
            }),
            catchError(({ error }: IErrorResponse) => {
              const message = error.message;
              this.notificationService.showMessage(message, 'error');
              return [
                usersActions.changeUserAccountSettingsFailure({ message }),
              ];
            })
          )
      )
    )
  );

  constructor(
    private adminService: AdminService,
    private actions$: Actions,
    private notificationService: NotificationService,
    private router: Router
  ) {}
}
