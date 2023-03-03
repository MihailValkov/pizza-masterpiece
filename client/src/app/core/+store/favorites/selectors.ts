import { createSelector } from "@ngrx/store";
import { IUserDataState } from "..";

export const selectFavorites = (state: IUserDataState) => state.userData.favorites;

export const selectFavoritesList = createSelector(selectFavorites, state => state.favoritesList);

export const selectFavoritesListCount = createSelector(selectFavorites, state => state.favoritesList?.length);

export const selectFavoritesUniqueIds = createSelector(selectFavorites, state =>
  state.favoritesList.map(p => p.uniqueId)
);
