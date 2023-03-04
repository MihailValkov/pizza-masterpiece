import { ActionReducerMap } from "@ngrx/store";
import { favoritesReducer, IFavoritesState } from "./reducers";

export interface IUserFavoritesState {
  readonly favorites: IFavoritesState;
}

export const favoritesReducers: ActionReducerMap<IUserFavoritesState> = {
  favorites: favoritesReducer,
};
