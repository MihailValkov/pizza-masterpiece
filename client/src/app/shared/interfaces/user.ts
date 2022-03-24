export interface IUser {
  _id: string;
  email: string;
}

export interface IRegisterUser {
  email: string;
  password: string;
  repeatPassword: string;
}

export interface ILoginUser {
  email: string;
  password: string;
}
