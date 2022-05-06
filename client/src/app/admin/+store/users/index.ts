import { ActionReducerMap } from '@ngrx/store';
import { usersReducer, IUsersState } from './reducers';

export interface IAdminUsersState {
  readonly users: IUsersState;
}

export const usersReducers: ActionReducerMap<IAdminUsersState> = {
  users: usersReducer,
};
