import { createReducer, on } from '@ngrx/store';
import * as cartActions from './actions';
import { ICartProduct } from 'src/app/shared/interfaces/product';

export interface ICartState {
  cartList: ICartProduct[];
  totalProducts: number;
  totalPrice: number;
  taxes: number;
}

const initialCartState: ICartState = {
  cartList: [],
  totalProducts: 0,
  taxes: 0,
  totalPrice: 0,
};

export const cartReducer = createReducer<ICartState>(
  initialCartState,
  on(cartActions.addProductToCart, (state, { product }) => {
    const index = state.cartList.findIndex(
      (p) => p.uniqueId === product.uniqueId
    );
    let cartList = [...state.cartList];
    let totalProducts = state.totalProducts;
    if (index !== -1) {
      const existingProduct = { ...cartList[index] };
      existingProduct.quantity += product.quantity;
      existingProduct.totalPrice =
        existingProduct.quantity * existingProduct.price;
      cartList[index] = existingProduct;
    } else {
      cartList.push(product);
      totalProducts++;
    }
    const totalPrice = state.totalPrice + product.totalPrice;
    const taxes = totalPrice > 0 && totalPrice < 30 ? 5 : 0;

    return {
      ...state,
      cartList,
      totalPrice,
      totalProducts,
      taxes,
    };
  }),
  on(cartActions.removeProductFromCart, (state, { index }) => {
    const existingProduct: ICartProduct = state.cartList[index];
    let totalPrice = state.totalPrice - existingProduct.totalPrice;
    if (totalPrice < 0) {
      totalPrice = 0;
    }
    const taxes = totalPrice > 0 && totalPrice < 30 ? 5 : 0;
    return {
      ...state,
      cartList: state.cartList.filter((_, i) => i !== index),
      totalProducts: state.totalProducts - 1,
      totalPrice,
      taxes,
    };
  }),
  on(cartActions.updateProductQuantity, (state, { index, actionType }) => {
    const cartProduct: ICartProduct = { ...state.cartList[index] };
    const quantity =
      actionType === 'increase'
        ? cartProduct.quantity + 1
        : cartProduct.quantity - 1;

    cartProduct.totalPrice = cartProduct.price * quantity;
    cartProduct.quantity = quantity;
    let totalPrice =
      actionType === 'increase'
        ? state.totalPrice + cartProduct.price
        : state.totalPrice - cartProduct.price;

    if (totalPrice < 0) {
      totalPrice = 0;
    }

    const taxes = totalPrice > 0 && totalPrice < 30 ? 5 : 0;
    let cartList = [];
    if (quantity === 0) {
      cartList = [
        ...state.cartList.slice(0, index),
        ...state.cartList.slice(index + 1),
      ];
    } else {
      cartList = [
        ...state.cartList.slice(0, index),
        cartProduct,
        ...state.cartList.slice(index + 1),
      ];
    }
    return {
      ...state,
      cartList,
      totalPrice,
      taxes,
      totalProducts:
        quantity === 0 ? state.totalProducts - 1 : state.totalProducts,
    };
  })
);
