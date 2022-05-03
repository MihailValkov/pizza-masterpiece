import { createAction, props } from '@ngrx/store';
import { IFavoriteProduct } from 'src/app/shared/interfaces/product';

const favoritesNamespace = '[Favorites]';

export const addProductToFavorites = createAction(
  `${favoritesNamespace} Add product start`,
  props<{ product: IFavoriteProduct }>()
);

export const addProductToFavoritesSuccess = createAction(
  `${favoritesNamespace} Add product success`
);

export const removeProductFromFavorites = createAction(
  `${favoritesNamespace} Remove product start`,
  props<{ index: number }>()
);

export const removeProductFromFavoritesSuccess = createAction(
  `${favoritesNamespace} Remove product success`
);
