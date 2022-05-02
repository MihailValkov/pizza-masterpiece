import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { switchMap, takeUntil, map, catchError } from 'rxjs';
import { IErrorResponse } from 'src/app/shared/interfaces/error-response';
import { IOrder } from 'src/app/shared/interfaces/order';

import { OrderService } from '../order.service';
import * as orderActions from './actions';

@Injectable()
export class OrdersEffects {
  createOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(orderActions.createOrderStart),
      switchMap(({ order }) =>
        this.orderService.createNewOrder(order).pipe(
          takeUntil(this.actions$.pipe(ofType(orderActions.createOrderCancel))),
          map((order: IOrder) => {
            return orderActions.createOrderSuccess({ order });
          }),
          catchError((err: IErrorResponse) => [
            orderActions.createOrderFailure({ message: err.error.message }),
          ])
        )
      )
    )
  );

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
          map((order) => orderActions.loadOrderSuccess({ order })),
          catchError((err: IErrorResponse) => [
            orderActions.loadOrderFailure({ message: err.error.message }),
          ])
        )
      )
    )
  );

  constructor(
    private orderService: OrderService,
    private actions$: Actions,
    private router: Router
  ) {}
}
