import { createSelector } from '@ngrx/store';
import { IAuthState } from './reducers';

interface ISelectState {
  auth: IAuthState;
}

export const selectAuth = (state: ISelectState) => state.auth;

export const selectUser = createSelector(selectAuth, (state) => state.user);

export const selectUserIsLogged = createSelector(
  selectAuth,
  (state) => !!state.user?._id
);
export const selectUserIsAdmin = createSelector(
  selectAuth,
  (state) => state.user?.role === 'Admin'
);
export const selectUserImage = createSelector(
  selectAuth,
  (state) => state.user?.image
);
export const selectRatedProducts = createSelector(
  selectAuth,
  (state) => state.user?.ratedProducts
);
export const selectIsLoading = createSelector(
  selectAuth,
  (state) => state.isLoading
);
export const selectUpdateUserImageIsLoading = createSelector(
  selectAuth,
  (state) => state.updateUserImageLoading
);
export const selectUpdateUserInfoIsLoading = createSelector(
  selectAuth,
  (state) => state.updateUserInfoLoading
);
export const selectUpdateUserAddressIsLoading = createSelector(
  selectAuth,
  (state) => state.updateUserAddressLoading
);

export const selectUpdateUserPasswordIsLoading = createSelector(
  selectAuth,
  (state) => state.updateUserPasswordLoading
);
export const selectErrorMessage = createSelector(
  selectAuth,
  (state) => state.message
);
