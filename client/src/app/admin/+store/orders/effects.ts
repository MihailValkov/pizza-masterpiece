import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, switchMap, takeUntil, map } from 'rxjs';
import { NotificationService } from 'src/app/core/notification.service';
import { IErrorResponse } from 'src/app/shared/interfaces/error-response';

import { AdminService } from '../../admin.service';
import * as ordersActions from './actions';

@Injectable()
export class AdminOrdersEffects {
  loadOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ordersActions.loadOrdersStart),
      switchMap(({ page, limit, sort, order, searchValue, selectValue }) =>
        this.adminService
          .loadOrders(page, limit, sort, order, searchValue, selectValue)
          .pipe(
            takeUntil(
              this.actions$.pipe(ofType(ordersActions.loadOrdersCancel))
            ),
            map(({ orders, count }) => {
              this.router.navigateByUrl(
                `/admin/orders?page=${
                  page + 1
                }&limit=${limit}&sort=${sort}&order=${order}&searchValue=${searchValue}&selectValue=${selectValue}`
              );
              return ordersActions.loadOrdersSuccess({ orders, count });
            }),
            catchError(({ error }: IErrorResponse) => {
              const message = error.message;
              this.notificationService.showMessage(message, 'error');
              return [ordersActions.loadOrdersFailure({ message })];
            })
          )
      )
    )
  );

  loadOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ordersActions.loadOrderStart),
      switchMap(({ orderId }) =>
        this.adminService.loadOrder(orderId).pipe(
          takeUntil(this.actions$.pipe(ofType(ordersActions.loadOrderCancel))),
          map(({ order }) => {
            return ordersActions.loadOrderSuccess({ order });
          }),
          catchError(({ error }: IErrorResponse) => {
            const message = error.message;
            this.notificationService.showMessage(message, 'error');
            return [ordersActions.loadOrderFailure({ message })];
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
