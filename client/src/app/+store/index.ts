import { ActionReducerMap } from '@ngrx/store';
import { authReducer, IAuthState } from './auth/reducers';
import { productsReducer, IProductsState } from './products/reducers';
import { AuthEffects } from './auth/effects';
import { ProductsEffects } from './products/effects';

export interface IRootState {
  readonly auth: IAuthState;
  readonly products: IProductsState;
}

export const reducers: ActionReducerMap<IRootState> = {
  auth: authReducer,
  products: productsReducer,
};

export const Effects = [AuthEffects, ProductsEffects];
