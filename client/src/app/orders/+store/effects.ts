import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { switchMap, takeUntil, map, catchError } from 'rxjs';
import { NotificationService } from 'src/app/core/notification.service';
import { IErrorResponse } from 'src/app/shared/interfaces/error-response';

import { OrderService } from '../order.service';
import * as orderActions from './actions';

@Injectable()
export class OrdersEffects {
  getMyOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(orderActions.loadOrdersStart),
      switchMap(({ page, limit, sort, order }) =>
        this.orderService.getMyOrders(page, limit, sort, order).pipe(
          takeUntil(this.actions$.pipe(ofType(orderActions.loadOrdersCancel))),
          map(({ ordersList, count }) => {
            this.router.navigateByUrl(
              `/orders?page=${
                page + 1
              }&limit=${limit}&sort=${sort}&order=${order}`
            );
            return orderActions.loadOrdersSuccess({ ordersList, count });
          }),
          catchError((err: IErrorResponse) => [
            orderActions.loadOrdersFailure({ message: err.error.message }),
          ])
        )
      )
    )
  );

  getMyOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(orderActions.loadOrderStart),
      switchMap(({ orderId }) =>
        this.orderService.getMyOrder(orderId).pipe(
          takeUntil(this.actions$.pipe(ofType(orderActions.loadOrderCancel))),
          map(({ order }) => orderActions.loadOrderSuccess({ order })),
          catchError((err: IErrorResponse) => [
            orderActions.loadOrderFailure({ message: err.error.message }),
          ])
        )
      )
    )
  );

  rateOrderedProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(orderActions.rateOrdererProductStart),
      switchMap(({ productId, rate, comment }) =>
        this.orderService.rateProduct(productId, rate, comment).pipe(
          takeUntil(
            this.actions$.pipe(ofType(orderActions.rateOrdererProductCancel))
          ),
          map(({ rating }) => {
            this.notificationService.showMessage(
              'Thank you for your review.',
              'success'
            );

            this.dialog.closeAll();
            return orderActions.rateOrdererProductSuccess({
              productId,
              rating,
            });
          }),
          catchError((err: IErrorResponse) => {
            const message = err.error.message;
            this.notificationService.showMessage(message, 'error');
            return [
              orderActions.rateOrdererProductFailure({
                message: err.error.message,
              }),
            ];
          })
        )
      )
    )
  );

  getCurrentProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(orderActions.loadOrderProductStart),
      switchMap(({ orderId, _id }) =>
        this.orderService.getCurrentProduct(orderId, _id).pipe(
          takeUntil(
            this.actions$.pipe(ofType(orderActions.loadOrderProductCancel))
          ),
          map(({ product }) => {
            return orderActions.loadOrderProductSuccess({
              product,
            });
          }),
          catchError((err: IErrorResponse) => {
            const message = err.error.message;
            this.notificationService.showMessage(message, 'error');
            return [
              orderActions.loadOrderProductFailure({
                message: err.error.message,
              }),
            ];
          })
        )
      )
    )
  );

  constructor(
    private orderService: OrderService,
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private actions$: Actions,
    private router: Router
  ) {}
}
