import { createAction, props } from '@ngrx/store';
import { IFavoriteProduct } from 'src/app/shared/interfaces/product';

const favoritesNamespace = '[Favorites]';

export const addProductToFavorites = createAction(
  `${favoritesNamespace} Add product`,
  props<{ product: IFavoriteProduct }>()
);

export const removeProductFromFavorites = createAction(
  `${favoritesNamespace} Remove product`,
  props<{ index: number }>()
);
