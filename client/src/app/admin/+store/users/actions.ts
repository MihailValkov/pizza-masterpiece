import { createAction, props } from '@ngrx/store';
import {
  IAccountStatus,
  IAdminUser,
  IBaseAdminUser,
  IRoles,
} from 'src/app/shared/interfaces/admin';
import { IUser } from 'src/app/shared/interfaces/user';

const adminUsersNamespace = '[Admin - Users]';

// Load Users
export const loadUsersStart = createAction(
  `${adminUsersNamespace} Load Users Start`,
  props<{
    sort: string;
    order: '' | 'asc' | 'desc';
    limit: number;
    page: number;
    searchValue: string;
    selectValue: string;
  }>()
);

export const loadUsersSuccess = createAction(
  `${adminUsersNamespace} Load Users Success`,
  props<{ users: IBaseAdminUser[]; count: number; roles: IRoles[] }>()
);

export const loadUsersFailure = createAction(
  `${adminUsersNamespace} Load Users Failure`,
  props<{ message: string }>()
);

export const loadUsersCancel = createAction(
  `${adminUsersNamespace} Load Users Cancel`
);

export const clearUsers = createAction(`${adminUsersNamespace} Clear Users`);

// Load User
export const loadUserStart = createAction(
  `${adminUsersNamespace} Load User Start`,
  props<{
    userId: string;
  }>()
);

export const loadUserSuccess = createAction(
  `${adminUsersNamespace} Load User Success`,
  props<{ user: IAdminUser }>()
);

export const loadUserFailure = createAction(
  `${adminUsersNamespace} Load User Failure`,
  props<{ message: string }>()
);

export const loadUserCancel = createAction(
  `${adminUsersNamespace} Load User Cancel`
);

export const clearUser = createAction(`${adminUsersNamespace} Clear User`);

// Change user information
export const changeUserInfoStart = createAction(
  `${adminUsersNamespace} Change User Info Start`,
  props<{
    userId: string;
    role: IRoles;
    accountStatus: IAccountStatus;
  }>()
);

export const changeUserInfoSuccess = createAction(
  `${adminUsersNamespace} Change User Info Success`,
  props<{ role: IRoles; accountStatus: IAccountStatus }>()
);

export const changeUserInfoFailure = createAction(
  `${adminUsersNamespace} Change User Info Failure`,
  props<{ message: string }>()
);

export const changeUserInfoCancel = createAction(
  `${adminUsersNamespace} Change User Info Cancel`
);
