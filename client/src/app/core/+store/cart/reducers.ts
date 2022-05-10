import { createReducer, on } from '@ngrx/store';
import * as cartActions from './actions';
import { ICartProduct } from 'src/app/shared/interfaces/product';

export interface ICartState {
  cartList: ICartProduct[];
  totalProducts: number;
  price: number;
  taxes: number;
  isLoading: boolean;
  errorMessage: string | null;
  lastCreatedOrderId: string | null;
}

const initialCartState: ICartState = {
  cartList: [],
  totalProducts: 0,
  price: 0,
  taxes: 0,
  isLoading: false,
  errorMessage: null,
  lastCreatedOrderId: null,
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
      totalProducts += product.quantity;
    } else {
      cartList.push(product);
      totalProducts += product.quantity;
    }
    const price = state.price + product.totalPrice;
    const taxes = price > 0 && price < 30 ? 5 : 0;

    return {
      ...state,
      cartList,
      price,
      totalProducts,
      taxes,
    };
  }),
  on(cartActions.removeProductFromCart, (state, { index }) => {
    const existingProduct: ICartProduct = state.cartList[index];
    let price = state.price - existingProduct.totalPrice;
    if (price < 0) {
      price = 0;
    }
    const cartList = state.cartList.filter((_, i) => i !== index);
    const taxes = price > 0 && price < 30 && cartList.length !== 0 ? 5 : 0;
    return {
      ...state,
      cartList,
      totalProducts: state.totalProducts - existingProduct.quantity,
      price,
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
    let price =
      actionType === 'increase'
        ? state.price + cartProduct.price
        : state.price - cartProduct.price;

    if (price < 0) {
      price = 0;
    }

    const taxes = price > 0 && price < 30 && quantity !== 0 ? 5 : 0;
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
      price,
      taxes,
      totalProducts:
        actionType === 'increase'
          ? state.totalProducts + 1
          : state.totalProducts - 1,
    };
  }),
  on(cartActions.completeCheckoutStart, (state) => {
    return { ...state, isLoading: true, errorMessage: null };
  }),
  on(cartActions.completeCheckoutSuccess, (state, { orderId }) => {
    return {
      ...state,
      isLoading: false,
      errorMessage: null,
      lastCreatedOrderId: orderId,
    };
  }),
  on(cartActions.completeCheckoutFailure, (state, { message }) => {
    return {
      ...state,
      isLoading: false,
      errorMessage: message,
    };
  }),
  on(cartActions.clearCart, (state) => ({
    ...initialCartState,
    lastCreatedOrderId: state.lastCreatedOrderId,
  }))
);
