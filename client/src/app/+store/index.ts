import { ActionReducerMap } from '@ngrx/store';
import { authReducer, IAuthState } from './reducers';

export interface IRootState {
  readonly auth: IAuthState;
}

export const reducers: ActionReducerMap<IRootState> = { auth: authReducer };
