import { ActionReducerMap } from '@ngrx/store';
import { IOrderState, ordersReducer } from './reducers';

export interface IOrderModuleState {
  readonly order: IOrderState;
}

export const reducers: ActionReducerMap<{}> = ordersReducer;
