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
  firstName: string;
  lastName: string;
  role: IRoles.Admin | IRoles.Member;
  accountStatus: IAccountStatus.Active | IAccountStatus.Inactive;
  ordersCount: string[];
  ratedProductsCount: number;
  createdAt: string;
}

export interface IAdminUser extends IBaseAdminUser {
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
  updatedAt: string;
}

export enum IOrderStatus {
  'Pending' = 'Pending',
  'Processing' = 'Processing',
  'Completed' = 'Completed',
}

// export interface IBaseAdminOrder {
//   _id: string;
//   createdAt: string;
//   user: {
//     firstName: string;
//     lastName: string;
//     phoneNumber: string;
//     imageUrl: string;
//     country: string;
//     city: string;
//     street: string;
//     streetNumber: number;
//   };
//   status: IOrderStatus;
//   paymentMethod: string;
//   price: number;
//   taxes: number;
//   totalProducts: number;
// }
export interface IBaseAdminOrder {
  _id: string;
  createdAt: string;
  user: {
    firstName: string;
    lastName: string;
    email: string;
  };
  status: IOrderStatus;
  paymentMethod: string;
  totalPrice: number;
  totalProducts: number;
}

export interface IAdminOrder extends IBaseAdminOrder {}
