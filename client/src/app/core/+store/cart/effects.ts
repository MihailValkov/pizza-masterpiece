import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, switchMap, takeUntil } from "rxjs";
import { NotificationService } from "../../notification.service";

import { loginSuccess, logoutSuccess, registerSuccess } from "src/app/+store/auth/actions";
import * as cartActions from "./actions";
import { HttpClient } from "@angular/common/http";

import { IErrorResponse } from "src/app/shared/interfaces/error-response";

@Injectable()
export class CartEffects {
  addProductToCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cartActions.addProductToCart),
      map(({ product }) => {
        this.notificationService.showMessage(`${product.name} has been added to your cart!`, "success", "end", "top");
        return cartActions.addProductToCartSuccess();
      })
    )
  );

  removeProductFromCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cartActions.removeProductFromCart),
      map(() => {
        this.notificationService.showMessage("Product has been removed from your cart!", "success", "end", "top");
        return cartActions.removeProductFromCartSuccess();
      })
    )
  );

  checkout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cartActions.completeCheckoutStart),
      switchMap(({ order }) =>
        this.http.post<{ orderId: string }>("/orders", order).pipe(
          takeUntil(this.actions$.pipe(ofType(cartActions.completeCheckoutCancel))),
          map(({ orderId }) => cartActions.completeCheckoutSuccess({ orderId })),
          catchError(({ error }: IErrorResponse) => {
            const message = error.message;
            return [cartActions.completeCheckoutFailure({ message })];
          })
        )
      )
    )
  );

  clearCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logoutSuccess, loginSuccess, registerSuccess, cartActions.completeCheckoutSuccess),
      map(() => cartActions.clearCart())
    )
  );

  constructor(private actions$: Actions, private notificationService: NotificationService, private http: HttpClient) {}
}
