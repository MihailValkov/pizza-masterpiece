import { createAction, props } from '@ngrx/store';
import {
  ILoginUser,
  IRegisterUser,
  IUpdateUserAddress,
  IUpdateUserInfo,
  IUpdateUserPassword,
  IUser,
} from '../../shared/interfaces/user';
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
export const loginClearError = createAction(
  `${authNamespace} Login Clear Error Message`
);

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
export const registerClearError = createAction(
  `${authNamespace} Register Clear Error Message`
);

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
  `${authNamespace} Authenticate Failure`
);

export const authenticateCancel = createAction(
  `${authNamespace} Authenticate Cancel`
);

export const updateUserImageStart = createAction(
  `${authNamespace} Update Image Start`,
  props<{ formData: FormData }>()
);

export const updateUserImageSuccess = createAction(
  `${authNamespace} Update Image Success`,
  props<{ image: { url: string; _id: string } }>()
);

export const updateUserImageFailure = createAction(
  `${authNamespace} Update Image Failure`,
  props<{ message: string }>()
);

export const updateUserImageCancel = createAction(
  `${authNamespace} Update Image Cancel`
);

export const updateUserInfoStart = createAction(
  `${authNamespace} Update User Info Start`,
  props<IUpdateUserInfo>()
);

export const updateUserInfoSuccess = createAction(
  `${authNamespace} Update User Info Success`,
  props<{ userInfo: IUpdateUserInfo }>()
);

export const updateUserInfoFailure = createAction(
  `${authNamespace} Update User Info Failure`,
  props<{ message: string }>()
);

export const updateUserInfoCancel = createAction(
  `${authNamespace} Update User Info Cancel`
);

export const updateUserAddressStart = createAction(
  `${authNamespace} Update User Address Start`,
  props<IUpdateUserAddress>()
);

export const updateUserAddressSuccess = createAction(
  `${authNamespace} Update User Address Success`,
  props<{ userAddress: IUpdateUserAddress }>()
);

export const updateUserAddressFailure = createAction(
  `${authNamespace} Update User Address Failure`,
  props<{ message: string }>()
);

export const updateUserAddressCancel = createAction(
  `${authNamespace} Update User Address Cancel`
);

export const updateUserPasswordStart = createAction(
  `${authNamespace} Update User Password Start`,
  props<IUpdateUserPassword>()
);

export const updateUserPasswordSuccess = createAction(
  `${authNamespace} Update User Password Success`
);

export const updateUserPasswordFailure = createAction(
  `${authNamespace} Update User Password Failure`,
  props<{ message: string }>()
);

export const updateUserPasswordCancel = createAction(
  `${authNamespace} Update User Password Cancel`
);

export const rateProductSuccess = createAction(
  `${authNamespace} Rating product Success`,
  props<{ productId: string }>()
);
