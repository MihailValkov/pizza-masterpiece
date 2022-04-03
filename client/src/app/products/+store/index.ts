import { ActionReducerMap } from '@ngrx/store';
import { productsReducer, IProductsState } from './reducers';

export interface IProductModuleState {
  readonly product: IProductsState;
}

export const reducers: ActionReducerMap<IProductModuleState> = {
  product: productsReducer,
};
