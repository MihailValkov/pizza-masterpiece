import { createAction, props } from "@ngrx/store";
import { ICartProduct } from "src/app/shared/interfaces/product";

const favoritesNamespace = "[Favorites]";

export const addProductToFavorites = createAction(
  `${favoritesNamespace} Add product start`,
  props<{ product: ICartProduct }>()
);

export const addProductToFavoritesSuccess = createAction(`${favoritesNamespace} Add product success`);

export const removeProductFromFavorites = createAction(
  `${favoritesNamespace} Remove product start`,
  props<{ uniqueId: string; name: string }>()
);

export const removeProductFromFavoritesSuccess = createAction(`${favoritesNamespace} Remove product success`);

export const clearFavorites = createAction(`${favoritesNamespace} Clear favorites`);
