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
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: {
    country: string;
    city: string;
    street: string;
    streetNumber: number;
  };
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

export interface IUpdateUserInfo {
  firstName: string;
  lastName: string;
  phoneNumber: string;
}
export interface IUpdateUserAddress {
  country: string;
  city: string;
  street: string;
  streetNumber: number;
}
