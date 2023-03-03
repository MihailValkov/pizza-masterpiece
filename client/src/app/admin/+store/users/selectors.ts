import { createSelector } from "@ngrx/store";
import { IUsersState } from "./reducers";

interface ISelectState {
  admin: {
    users: IUsersState;
  };
}

export const selectUsers = (state: ISelectState) => state.admin.users;

export const selectAdminUsersList = createSelector(selectUsers, state => state.users.usersList);

export const selectAdminUsersListCount = createSelector(selectUsers, state => state.users.count);

export const selectAdminUsersRoles = createSelector(selectUsers, state => state.users.roles);

export const selectAdminUsersAccountStatuses = createSelector(selectUsers, state => state.users.accountStatuses);

export const selectAdminUsersIsLoading = createSelector(selectUsers, state => state.users.isLoading);

export const selectAdminUsersErrorMessage = createSelector(selectUsers, state => state.users.errorMessage);

export const selectAdminCurrentUser = createSelector(selectUsers, state => state.currentUser.user);

export const selectAdminCurrentUserIsLoading = createSelector(selectUsers, state => state.currentUser.isLoading);

export const selectAdminCurrentUserErrorMessage = createSelector(selectUsers, state => state.currentUser.errorMessage);
