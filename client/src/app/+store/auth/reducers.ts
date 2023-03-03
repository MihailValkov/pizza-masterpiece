import { createReducer, on } from "@ngrx/store";
import { IUser } from "../../shared/interfaces/user";
import * as authActions from "./actions";

export interface IAuthState {
  user: IUser | undefined | null;
  isLoading: boolean;
  message: string | null;
  updateUserImageLoading: boolean;
  updateUserInfoLoading: boolean;
  updateUserAddressLoading: boolean;
  updateUserPasswordLoading: boolean;
}

const initialAuthState: IAuthState = {
  user: undefined,
  isLoading: false,
  message: null,
  updateUserImageLoading: false,
  updateUserInfoLoading: false,
  updateUserAddressLoading: false,
  updateUserPasswordLoading: false,
};

const setUser = (
  state: IAuthState,
  { user }: ReturnType<typeof authActions.loginSuccess> | ReturnType<typeof authActions.registerSuccess>
) => ({
  ...state,
  user,
  message: null,
  isLoading: false,
});

const setErrorMessage = (state: IAuthState, { message }: { message: string }) => ({
  ...state,
  message,
  isLoading: false,
  updateUserImageLoading: false,
  updateUserInfoLoading: false,
  updateUserAddressLoading: false,
  updateUserPasswordLoading: false,
});

const startFetching = (state: IAuthState) => ({
  ...state,
  isLoading: true,
  message: null,
});

export const authReducer = createReducer<IAuthState>(
  initialAuthState,
  on(authActions.loginStart, startFetching),
  on(authActions.loginSuccess, setUser),
  on(authActions.loginFailure, setErrorMessage),
  on(authActions.loginClearError, state => ({
    ...state,
    message: null,
  })),
  on(authActions.registerStart, startFetching),
  on(authActions.registerSuccess, setUser),
  on(authActions.registerFailure, setErrorMessage),
  on(authActions.registerClearError, state => ({
    ...state,
    message: null,
  })),
  on(authActions.authenticateStart, startFetching),
  on(authActions.authenticateSuccess, (state, { user }) => {
    return {
      ...state,
      user,
      isLoading: false,
    };
  }),
  on(authActions.authenticateFailure, state => ({
    ...state,
    isLoading: false,
    user: null,
  })),
  on(authActions.logoutStart, startFetching),
  on(authActions.logoutSuccess, state => ({
    ...state,
    user: null,
    isLoading: false,
  })),
  on(authActions.updateUserImageStart, state => ({
    ...state,
    updateUserImageLoading: true,
  })),
  on(authActions.updateUserImageSuccess, (state, { image }) => {
    if (state.user) {
      return {
        ...state,
        updateUserImageLoading: false,
        user: { ...state.user, image },
      };
    }
    return state;
  }),
  on(authActions.updateUserImageFailure, setErrorMessage),
  on(authActions.updateUserInfoStart, state => ({
    ...state,
    updateUserInfoLoading: true,
  })),
  on(authActions.updateUserInfoSuccess, (state, { userInfo }) => {
    if (state.user) {
      return {
        ...state,
        updateUserInfoLoading: false,
        user: { ...state.user, ...userInfo },
      };
    }
    return state;
  }),
  on(authActions.updateUserInfoFailure, setErrorMessage),
  on(authActions.updateUserAddressStart, state => ({
    ...state,
    updateUserAddressLoading: true,
  })),
  on(authActions.updateUserAddressSuccess, (state, { userAddress }) => {
    if (state.user) {
      return {
        ...state,
        updateUserAddressLoading: false,
        user: { ...state.user, address: userAddress },
      };
    }
    return state;
  }),
  on(authActions.updateUserInfoFailure, setErrorMessage),
  on(authActions.updateUserPasswordStart, state => ({
    ...state,
    updateUserPasswordLoading: true,
  })),
  on(authActions.updateUserPasswordSuccess, state => {
    if (state.user) {
      return {
        ...state,
        updateUserPasswordLoading: false,
      };
    }
    return state;
  }),
  on(authActions.updateUserPasswordFailure, setErrorMessage),
  on(authActions.rateProductSuccess, (state: IAuthState, { productId }) => {
    if (state?.user) {
      return {
        ...state,
        user: {
          ...state.user,
          ratedProducts: [...(state.user?.ratedProducts || []), productId],
        },
      };
    }
    return state;
  })
);
