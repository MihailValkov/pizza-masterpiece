import { ActionReducerMap } from '@ngrx/store';
import { ordersReducer, IOrdersState } from './reducers';

export interface IAdminOrdersState {
  readonly orders: IOrdersState;
}

export const ordersReducers: ActionReducerMap<IAdminOrdersState> = {
  orders: ordersReducer,
};
