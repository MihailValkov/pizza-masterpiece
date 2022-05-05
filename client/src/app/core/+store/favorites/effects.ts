import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs';
import { NotificationService } from '../../notification.service';
import * as favoritesActions from './actions';
import { logoutSuccess } from '../../../+store/actions';

@Injectable()
export class FavoritesEffects {
  addProductToFavorites$ = createEffect(() =>
    this.actions$.pipe(
      ofType(favoritesActions.addProductToFavorites),
      map(({ product }) => {
        this.notificationService.showMessage(
          `${product.name} has been added to your Favorites!`,
          'success',
          'end',
          'top'
        );
        return favoritesActions.addProductToFavoritesSuccess();
      })
    )
  );

  removeProductFromFavorites$ = createEffect(() =>
    this.actions$.pipe(
      ofType(favoritesActions.removeProductFromFavorites),
      map(() => {
        this.notificationService.showMessage(
          'Product has been removed from your Favorites!',
          'error',
          'end',
          'top'
        );
        return favoritesActions.removeProductFromFavoritesSuccess();
      })
    )
  );

  clearFavorites$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logoutSuccess),
      map(() => favoritesActions.clearFavorites())
    )
  );

  constructor(
    private actions$: Actions,
    private notificationService: NotificationService
  ) {}
}
