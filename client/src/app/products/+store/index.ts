import { ActionReducerMap } from '@ngrx/store';
import { IRootState } from 'src/app/+store';
import { productsReducer, IProductsState } from './reducers';

export interface IProductModuleState extends IRootState {
  readonly product: IProductsState;
}

export const reducers: ActionReducerMap<{}> = productsReducer;

