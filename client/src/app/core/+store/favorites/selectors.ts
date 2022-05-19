import { createSelector } from '@ngrx/store';
import { IRootState } from 'src/app/+store';
import { IFavoritesState } from './reducers';

interface ISelectState extends IRootState {
  userData: {
    favorites: IFavoritesState;
  };
}

export const selectFavorites = (state: ISelectState) =>
  state.userData.favorites;

export const selectFavoritesList = createSelector(
  selectFavorites,
  (state) => state.favoritesList
);

export const selectFavoritesListCount = createSelector(
  selectFavorites,
  (state) => state.favoritesList?.length
);

export const selectFavoritesUniqueIds = createSelector(
  selectFavorites,
  (state) => state.favoritesList.map((p) => p.uniqueId)
);
