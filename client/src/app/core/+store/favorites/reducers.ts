import { createReducer, on } from "@ngrx/store";
import * as favoritesActions from "./actions";
import { ICartProduct } from "src/app/shared/interfaces/product";

export interface IFavoritesState {
  favoritesList: ICartProduct[];
}

const initialFavoritesState: IFavoritesState = {
  favoritesList: [],
};

export const favoritesReducer = createReducer<IFavoritesState>(
  initialFavoritesState,
  on(favoritesActions.addProductToFavorites, (state, { product }) => {
    const favoritesList = [...state.favoritesList];
    const existingProductIndex = state.favoritesList.findIndex(p => p.uniqueId === product.uniqueId);

    if (existingProductIndex === -1) {
      favoritesList.push(product);
    }

    return {
      ...state,
      favoritesList,
    };
  }),
  on(favoritesActions.removeProductFromFavorites, (state, { uniqueId }) => {
    return {
      ...state,
      favoritesList: state.favoritesList.filter(p => p.uniqueId !== uniqueId),
    };
  }),
  on(favoritesActions.clearFavorites, () => initialFavoritesState)
);
