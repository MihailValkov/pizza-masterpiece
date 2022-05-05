import { createReducer, on } from '@ngrx/store';
import * as favoritesActions from './actions';
import { IFavoriteProduct } from 'src/app/shared/interfaces/product';

export interface IFavoritesState {
  favoritesList: IFavoriteProduct[];
}

const initialFavoritesState: IFavoritesState = {
  favoritesList: [],
};

export const favoritesReducer = createReducer<IFavoritesState>(
  initialFavoritesState,
  on(favoritesActions.addProductToFavorites, (state, { product }) => {
    return {
      ...state,
      favoritesList: state.favoritesList.concat(product),
    };
  }),
  on(favoritesActions.removeProductFromFavorites, (state, { index }) => {
    return {
      ...state,
      favoritesList: state.favoritesList.filter((_, i) => i !== index),
    };
  }),
  on(favoritesActions.clearFavorites, () => initialFavoritesState)
);
