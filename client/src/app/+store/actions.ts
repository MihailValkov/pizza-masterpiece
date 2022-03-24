import { createAction, props } from '@ngrx/store';
import { ILoginUser, IRegisterUser, IUser } from '../shared/interfaces/user';
const authNamespace = '[Auth]';

export const loginStart = createAction(
  `${authNamespace} Login Start`,
  props<ILoginUser>()
);

export const loginSuccess = createAction(
  `${authNamespace} Login Success`,
  props<{ user: IUser }>()
);

export const loginFailure = createAction(
  `${authNamespace} Login Failure`,
  props<{ message: string }>()
);

export const loginCancel = createAction(`${authNamespace} Login Cancel`);
export const loginClearError = createAction(`${authNamespace} Login Clear Error Message`);

export const registerStart = createAction(
  `${authNamespace} Register Start`,
  props<IRegisterUser>()
);

export const registerSuccess = createAction(
  `${authNamespace} Register Success`,
  props<{ user: IUser }>()
);
export const registerFailure = createAction(
  `${authNamespace} Register Failure`,
  props<{ message: string }>()
);
export const registerCancel = createAction(`${authNamespace} Register Cancel`);
export const registerClearError = createAction(`${authNamespace} Register Clear Error Message`);

export const logoutStart = createAction(`${authNamespace} Logout Start`);
export const logoutSuccess = createAction(`${authNamespace} Logout Success`);

export const authenticateStart = createAction(
  `${authNamespace} Authenticate Start`
);

export const authenticateSuccess = createAction(
  `${authNamespace} Authenticate Success`,
  props<{ user: IUser }>()
);

export const authenticateFailure = createAction(
  `${authNamespace} Authenticate Failure`,
);

export const authenticateCancel = createAction(
  `${authNamespace} Authenticate Cancel`
);

