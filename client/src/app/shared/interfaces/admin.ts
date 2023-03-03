export enum IRole {
  "Member" = "Member",
  "Admin" = "Admin",
}

export enum IAccountStatus {
  "Active" = "Active",
  "Inactive" = "Inactive",
}

export interface IBaseAdminUser {
  _id: string;
  image: {
    _id: string;
    url: string;
  };
  email: string;
  firstName: string;
  lastName: string;
  role: IRole.Admin | IRole.Member;
  accountStatus: IAccountStatus.Active | IAccountStatus.Inactive;
  ordersCount: string[];
  ratedProductsCount: number;
  createdAt: string;
}

export interface IAdminUser extends IBaseAdminUser {
  phoneNumber: string;
  address: {
    country: string;
    city: string;
    street: string;
    streetNumber: number;
  };
  updatedAt: string;
}

export enum IOrderStatus {
  "Pending" = "Pending",
  "Processing" = "Processing",
  "Completed" = "Completed",
}
export interface IAdminOrderBaseUserInfo {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}
export interface IAdminOrderUserInfo extends IAdminOrderBaseUserInfo {
  phoneNumber: string;
  imageUrl: string;
  country: string;
  city: string;
  street: string;
  streetNumber: number;
}

export interface IBaseAdminOrderProduct {
  _id: string;
  name: string;
  imageUrl: string;
  ingredients: string[];
  selectedSize: string;
  selectedDough: string;
  selectedExtras: string[];
  weight: number;
  price: number;
  quantity: number;
  totalPrice: number;
}

export interface IBaseAdminOrder<T> {
  _id: string;
  createdAt: string;
  user: T;
  status: IOrderStatus;
  paymentMethod: string;
  totalPrice: number;
  totalProducts: number;
}

export interface IAdminOrder extends IBaseAdminOrder<IAdminOrderUserInfo> {
  updatedAt: string;
  deliveryPrice: number;
  price: number;
  products: IBaseAdminOrderProduct[];
}

export interface IAdminBaseProduct {
  _id: string;
  name: string;
  image: {
    _id: string;
    url: string;
  };
  rating: number;
  createdAt: string;
  updatedAt: string;
}
export interface IAdminProduct extends IAdminBaseProduct {}
