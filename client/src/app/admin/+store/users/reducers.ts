import { createReducer, on } from '@ngrx/store';
import {
  IBaseAdminUser,
  IRoles,
  IAdminUser,
} from 'src/app/shared/interfaces/admin';

import * as usersActions from './actions';

export interface IUsersState {
  users: {
    usersList: IBaseAdminUser[];
    count: number;
    roles: IRoles[];
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
  on(
    usersActions.loadUsersSuccess,
    (state: IUsersState, { users, count, roles }) => {
      return {
        ...state,
        users: {
          usersList: users,
          count,
          roles,
          isLoading: false,
          errorMessage: null,
        },
      };
    }
  ),
  on(
    usersActions.loadUsersFailure,
    (state: IUsersState, { message }: { message: string }) => {
      return {
        ...state,
        users: { ...state.users, isLoading: false, errorMessage: message },
      };
    }
  ),
  on(usersActions.clearUsers, (state: IUsersState) => {
    return {
      ...state,
      users: {
        usersList: [],
        count: 0,
        roles: [],
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
  on(
    usersActions.loadUsersFailure,
    (state: IUsersState, { message }: { message: string }) => {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          isLoading: false,
          errorMessage: message,
        },
      };
    }
  ),
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
  on(usersActions.changeUserInfoStart, (state: IUsersState) => {
    return {
      ...state,
      currentUser: {
        ...state.currentUser,
        isLoading: true,
        errorMessage: null,
      },
    };
  }),
  on(
    usersActions.changeUserInfoSuccess,
    (state: IUsersState, { role, accountStatus }) => {
      if (!state.currentUser.user) {
        return state;
      }

      return {
        ...state,
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
    }
  ),
  on(
    usersActions.changeUserInfoFailure,
    (state: IUsersState, { message }: { message: string }) => {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          isLoading: false,
          errorMessage: message,
        },
      };
    }
  )
);
