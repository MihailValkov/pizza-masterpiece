import { createReducer, on } from "@ngrx/store";
import { IBaseAdminUser, IRole, IAdminUser, IAccountStatus } from "src/app/shared/interfaces/admin";

import * as usersActions from "./actions";

export interface IUsersState {
  users: {
    usersList: IBaseAdminUser[];
    count: number;
    roles: IRole[];
    accountStatuses: IAccountStatus[];
    isLoading: boolean;
    errorMessage: null | string;
  };
  currentUser: {
    user: IAdminUser | null;
    isLoading: boolean;
    errorMessage: null | string;
  };
}

const initialUsersState: IUsersState = {
  users: {
    usersList: [],
    count: 0,
    roles: [],
    accountStatuses: [],
    isLoading: true,
    errorMessage: null,
  },
  currentUser: {
    user: null,
    isLoading: false,
    errorMessage: null,
  },
};

export const usersReducer = createReducer<IUsersState>(
  initialUsersState,
  on(usersActions.loadUsersStart, (state: IUsersState) => {
    return {
      ...state,
      users: { ...state.users, isLoading: true, errorMessage: null },
    };
  }),
  on(usersActions.loadUsersSuccess, (state: IUsersState, { users, count, roles, accountStatuses }) => {
    return {
      ...state,
      users: {
        usersList: users,
        count,
        roles,
        accountStatuses,
        isLoading: false,
        errorMessage: null,
      },
    };
  }),
  on(usersActions.loadUsersFailure, (state: IUsersState, { message }: { message: string }) => {
    return {
      ...state,
      users: { ...state.users, isLoading: false, errorMessage: message },
    };
  }),
  on(usersActions.clearUsers, (state: IUsersState) => {
    return {
      ...state,
      users: {
        usersList: [],
        count: 0,
        roles: [],
        accountStatuses: [],
        isLoading: true,
        errorMessage: null,
      },
    };
  }),
  on(usersActions.loadUserStart, (state: IUsersState) => {
    return {
      ...state,
      currentUser: {
        user: null,
        isLoading: true,
        errorMessage: null,
      },
    };
  }),
  on(usersActions.loadUserSuccess, (state: IUsersState, { user }) => {
    return {
      ...state,

      currentUser: {
        user,
        isLoading: false,
        errorMessage: null,
      },
    };
  }),
  on(usersActions.loadUsersFailure, (state: IUsersState, { message }: { message: string }) => {
    return {
      ...state,
      currentUser: {
        ...state.currentUser,
        isLoading: false,
        errorMessage: message,
      },
    };
  }),
  on(usersActions.clearUsers, (state: IUsersState) => {
    return {
      ...state,
      currentUser: {
        user: null,
        isLoading: false,
        errorMessage: null,
      },
    };
  }),
  on(usersActions.changeUserAccountSettingsStart, (state: IUsersState) => {
    return {
      ...state,
      currentUser: {
        ...state.currentUser,
        isLoading: true,
        errorMessage: null,
      },
    };
  }),
  on(usersActions.changeUserAccountSettingsSuccess, (state: IUsersState, { role, accountStatus }) => {
    if (!state?.currentUser?.user || !state?.users?.usersList) {
      return state;
    }
    const userId = state.currentUser.user._id;
    const copiedUsers = [...state.users.usersList.map(u => (u._id === userId ? { ...u, role, accountStatus } : u))];

    return {
      ...state,
      users: {
        ...state.users,
        usersList: copiedUsers,
      },
      currentUser: {
        user: {
          ...state.currentUser.user,
          role,
          accountStatus,
        },
        isLoading: false,
        errorMessage: null,
      },
    };
  }),
  on(usersActions.changeUserAccountSettingsFailure, (state: IUsersState, { message }: { message: string }) => {
    return {
      ...state,
      currentUser: {
        ...state.currentUser,
        isLoading: false,
        errorMessage: message,
      },
    };
  })
);
