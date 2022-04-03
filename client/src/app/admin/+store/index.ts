import { combineReducers } from '@ngrx/store';
import { IRootState } from 'src/app/+store';
import { IAdminProductsState, productsReducers } from './products';


export interface IAdminModuleState extends IRootState {
  admin: IAdminProductsState 
}

export const reducers = combineReducers({
  products: productsReducers.products,
});
