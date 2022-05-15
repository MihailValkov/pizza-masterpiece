import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs';
import { NotificationService } from '../../notification.service';
import * as favoritesActions from './actions';
import { logoutSuccess } from '../../../+store/auth/actions';

@Injectable()
export class FavoritesEffects {
  addProductToFavorites$ = createEffect(() =>
    this.actions$.pipe(
      ofType(favoritesActions.addProductToFavorites),
      map(({ product }) => {
        this.notificationService.showMessage(
          `${product.name} has been added to your favorites!`,
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
      map(({ name }) => {
        this.notificationService.showMessage(
          `${name} has been removed from your favorites!`,
          'success',
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
