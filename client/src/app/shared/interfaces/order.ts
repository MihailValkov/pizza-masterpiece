import { IAddressForm } from 'src/app/cart/checkout/address-form.service';
import { IUserForm } from 'src/app/cart/checkout/user-form.service';

export interface IOrderProduct {
  productId: string;
  selectedSize: { size: string; _id: string };
  selectedDough: { dough: string; _id: string };
  selectedExtras: { extra: string; _id: string }[];
  weight: number;
  quantity: number;
  price: number;
  totalPrice: number;
}

export interface IOrder {
  user: IUserForm & IAddressForm;
  products: IOrderProduct[];
  totalProducts: number;
  paymentMethod: string;
  price: number;
  deliveryPrice: number;
  totalPrice: number;
}

export interface IOrderProductDetail {
  _id: string;
  selectedExtras: string[];
  selectedSize: string;
  selectedDough: string;
  weight: number;
  quantity: number;
  price: number;
  totalPrice: number;
  name: string;
  description: string;
  imageUrl: string;
  ingredients: string[];
  rating: number;
  rates: number[];
}

export interface IOrderDetail {
  _id: string;
  createdAt: string;
  status: string;
  user: IUserForm & IAddressForm;
  paymentMethod: string;
  deliveryPrice: number;
  price: number;
  totalPrice: number;
  totalProducts: number;
  products: IOrderProductDetail[];
}
