import { combineReducers, MetaReducer } from '@ngrx/store';
import { IRootState } from 'src/app/+store';
import { cartReducers } from './cart';
import { ICartState } from './cart/reducers';
import { favoritesReducers } from './favorites';
import { IFavoritesState } from './favorites/reducers';
import { hydrationMetaReducer } from './meta-reducers';

export interface IUserDataState {
  readonly cart: ICartState;
  readonly favorites: IFavoritesState;
}

export interface IUserDataState extends IRootState {
  userData: IUserDataState;
}

export const reducers = combineReducers({
  cart: cartReducers.cart,
  favorites: favoritesReducers.favorites,
});

export const metaReducers: MetaReducer[] = [hydrationMetaReducer];
