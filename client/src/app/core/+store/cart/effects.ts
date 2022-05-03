import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs';
import { NotificationService } from '../../notification.service';
import * as cartActions from './actions';

@Injectable()
export class CartEffects {
  addProductToCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cartActions.addProductToCart),
      map(({ product }) => {
        this.notificationService.showMessage(
          `${product.name} has been added to your Cart!`,
          'success',
          'end',
          'top'
        );
        return cartActions.addProductToCartSuccess();
      })
    )
  );

  removeProductFromCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cartActions.removeProductFromCart),
      map(() => {
        this.notificationService.showMessage(
          'Product has been removed from your Cart!',
          'error',
          'end',
          'top'
        );
        return cartActions.removeProductFromCartSuccess();
      })
    )
  );

  constructor(
    private actions$: Actions,
    private notificationService: NotificationService
  ) {}
}
