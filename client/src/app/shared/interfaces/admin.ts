export enum IRoles {
  'Member' = 'Member',
  'Admin' = 'Admin',
}

export enum IAccountStatus {
  'Active' = 'Active',
  'Inactive' = 'Inactive',
}

export interface IBaseAdminUser {
  _id: string;
  email: string;
  role: IRoles.Admin | IRoles.Member;
  accountStatus: IAccountStatus.Active | IAccountStatus.Inactive;
  orders: string[];
  ordersCount: string[];
  ratedProducts: number;
  ratedProductsCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface IAdminUser extends IBaseAdminUser {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  image: {
    _id: string;
    url: string;
  };
  address: {
    country: string;
    city: string;
    street: string;
    streetNumber: number;
  };
}
