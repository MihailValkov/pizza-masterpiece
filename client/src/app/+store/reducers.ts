import { createReducer, on } from '@ngrx/store';
import { IUser } from '../shared/interfaces/user';
import * as authActions from './actions';

export interface IAuthState {
  user: IUser | undefined | null;
  isLoading: boolean;
  message: string | null;
  success: boolean;
}

const initialAuthState: IAuthState = {
  user: undefined,
  isLoading: false,
  message: null,
  success: false,
};

const setUser = (
  state: IAuthState,
  {
    user,
  }:
    | ReturnType<typeof authActions.loginSuccess>
    | ReturnType<typeof authActions.registerSuccess>
    | ReturnType<typeof authActions.authenticateSuccess>
) => ({
  ...state,
  user,
  message: null,
  isLoading: false,
  success: true,
});

const setErrorMessage = (
  state: IAuthState,
  { message }: { message: string }
) => ({
  ...state,
  message,
  isLoading: false,
  success: false,
});

const startFetching = (state: IAuthState) => ({
  ...state,
  user: null,
  isLoading: true,
  message: null,
});

export const authReducer = createReducer<IAuthState>(
  initialAuthState,
  on(authActions.loginStart, startFetching),
  on(authActions.loginSuccess, setUser),
  on(authActions.loginFailure, setErrorMessage),
  on(authActions.loginClearError, (state) => ({
    ...state,
    message: null,
    success: false,
  })),
  on(authActions.registerStart, startFetching),
  on(authActions.registerSuccess, setUser),
  on(authActions.registerFailure, setErrorMessage),
  on(authActions.registerClearError, (state) => ({
    ...state,
    message: null,
    success: false,
  })),
  on(authActions.authenticateStart, startFetching),
  on(authActions.authenticateSuccess, setUser),
  on(authActions.authenticateFailure, (state) => ({
    ...state,
    isLoading: false,
    user: null,
  })),
  on(authActions.logoutStart, startFetching),
  on(authActions.logoutSuccess, (state) => ({
    ...state,
    user: null,
    isLoading: false,
    success: false,
  }))
);
