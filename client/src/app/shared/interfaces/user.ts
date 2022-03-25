interface IBaseUser {
  _id: string;
  email: string;
  role: 'Member' | 'Admin';
  image: {
    _id: string;
    url: string;
  };
  createdAt: Date;
  updatedAt: Date;
}
export interface IUser extends IBaseUser {
  username: string;
  phone: string;
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
