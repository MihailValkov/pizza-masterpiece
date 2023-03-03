import { IUserPersonalInfo, IUserAddress } from "./user";

export interface IOrder {
  _id: string;
  totalProducts: number;
  totalPrice: number;
  status: string;
  paymentMethod: string;
  createdAt: string;
}
export interface IOrderBaseProduct {
  _id?: string;
  productId: string;
  name?: string;
  imageUrl?: string;
  weight: number;
  quantity: number;
  price: number;
  totalPrice: number;
}
export interface IOrderDetail extends IOrder {
  user: IUserPersonalInfo & IUserAddress;
  deliveryPrice: number;
  price: number;
  products: IOrderBaseProduct[];
}

export interface IOrderProductDetail extends IOrderBaseProduct {
  selectedExtras: string[];
  selectedSize: string;
  selectedDough: string;
  description: string;
  ingredients: string[];
  rating: number;
  rates: number[];
}

export interface IOrderCreateProduct extends IOrderBaseProduct {
  productId: string;
  selectedSize: { size: string; _id: string };
  selectedDough: { dough: string; _id: string };
  selectedExtras: { extra: string; _id: string }[];
}
export interface IOrderCreate {
  user: IUserPersonalInfo & IUserAddress;
  products: IOrderCreateProduct[];
  totalProducts: number;
  price: number;
  deliveryPrice: number;
  totalPrice: number;
  paymentMethod: string;
}
