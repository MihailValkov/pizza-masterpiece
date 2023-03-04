import { createAction, props } from "@ngrx/store";
import { IAccountStatus, IAdminUser, IBaseAdminUser, IRole } from "src/app/shared/interfaces/admin";
const adminUsersNamespace = "[Admin - Users]";

// Load Users
export const loadUsersStart = createAction(
  `${adminUsersNamespace} Load Users Start`,
  props<{
    sort: string;
    order: "" | "asc" | "desc";
    limit: number;
    page: number;
    searchValue: string;
    selectValue: string;
  }>()
);

export const loadUsersSuccess = createAction(
  `${adminUsersNamespace} Load Users Success`,
  props<{
    users: IBaseAdminUser[];
    count: number;
    roles: IRole[];
    accountStatuses: IAccountStatus[];
  }>()
);

export const loadUsersFailure = createAction(`${adminUsersNamespace} Load Users Failure`, props<{ message: string }>());

export const loadUsersCancel = createAction(`${adminUsersNamespace} Load Users Cancel`);

export const clearUsers = createAction(`${adminUsersNamespace} Clear Users`);

// Load User
export const loadUserStart = createAction(
  `${adminUsersNamespace} Load User Start`,
  props<{
    userId: string;
  }>()
);

export const loadUserSuccess = createAction(`${adminUsersNamespace} Load User Success`, props<{ user: IAdminUser }>());

export const loadUserFailure = createAction(`${adminUsersNamespace} Load User Failure`, props<{ message: string }>());

export const loadUserCancel = createAction(`${adminUsersNamespace} Load User Cancel`);

export const clearUser = createAction(`${adminUsersNamespace} Clear User`);

// Change user information
export const changeUserAccountSettingsStart = createAction(
  `${adminUsersNamespace} Change User Account Settings Start`,
  props<{
    userId: string;
    role: IRole;
    accountStatus: IAccountStatus;
  }>()
);

export const changeUserAccountSettingsSuccess = createAction(
  `${adminUsersNamespace} Change User Account Settings Success`,
  props<{ role: IRole; accountStatus: IAccountStatus }>()
);

export const changeUserAccountSettingsFailure = createAction(
  `${adminUsersNamespace} Change User Account Settings Failure`,
  props<{ message: string }>()
);

export const changeUserAccountSettingsCancel = createAction(
  `${adminUsersNamespace} Change User Account Settings Cancel`
);
