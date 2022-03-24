import { createSelector } from '@ngrx/store';
import { IAuthState } from './reducers';

interface ISelectState {
  auth: IAuthState;
}

export const selectAuth = (state: ISelectState) => state.auth;

export const selectUser = createSelector(selectAuth, (state) => state.user);
export const selectIsLoading = createSelector(
  selectAuth,
  (state) => state.isLoading
);
export const selectErrorMessage = createSelector(
  selectAuth,
  (state) => state.message
);
