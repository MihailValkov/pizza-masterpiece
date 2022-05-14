import { createReducer, on } from '@ngrx/store';
import * as cartActions from './actions';
import { ICartProduct } from 'src/app/shared/interfaces/product';

export interface ICartState {
  cartList: ICartProduct[];
  totalProducts: number;
  price: number;
  deliveryPrice: number;
  isLoading: boolean;
  errorMessage: string | null;
  lastCreatedOrderId: string | null;
}

const initialCartState: ICartState = {
  cartList: [],
  totalProducts: 0,
  price: 0,
  deliveryPrice: 0,
  isLoading: false,
  errorMessage: null,
  lastCreatedOrderId: null,
};

export const cartReducer = createReducer<ICartState>(
  initialCartState,
  on(cartActions.addProductToCart, (state, { product }) => {
    let cartList = [...state.cartList];
    const existingProductIndex = state.cartList.findIndex(
      (p) => p.uniqueId === product.uniqueId
    );
    if (existingProductIndex !== -1) {
      const existingProduct = { ...cartList[existingProductIndex] };
      existingProduct.quantity += product.quantity;
      existingProduct.totalPrice =
        existingProduct.quantity * existingProduct.price;
      cartList[existingProductIndex] = existingProduct;
    } else {
      cartList.push(product);
    }
    const price = state.price + product.totalPrice;
    const deliveryPrice = price > 0 && price < 30 ? 5 : 0;

    return {
      ...state,
      cartList,
      price,
      totalProducts: state.totalProducts + product.quantity,
      deliveryPrice,
    };
  }),
  on(cartActions.removeProductFromCart, (state, { uniqueId }) => {
    const existingProductIndex = state.cartList.findIndex(
      (p) => p.uniqueId === uniqueId
    );
    if (existingProductIndex === -1) {
      return state;
    }
    const existingProduct: ICartProduct = state.cartList[existingProductIndex];
    let price = state.price - existingProduct.totalPrice;
    if (price < 0) {
      price = 0;
    }
    const cartList = state.cartList.filter((p) => p.uniqueId !== uniqueId);
    const deliveryPrice =
      price > 0 && price < 30 && cartList.length !== 0 ? 5 : 0;
    return {
      ...state,
      cartList,
      totalProducts: state.totalProducts - existingProduct.quantity,
      price,
      deliveryPrice,
    };
  }),
  on(cartActions.updateProductQuantity, (state, { uniqueId, actionType }) => {
    const existingProductIndex = state.cartList.findIndex(
      (p) => p.uniqueId === uniqueId
    );
    if (existingProductIndex === -1) {
      return state;
    }
    const existingProduct = state.cartList[existingProductIndex];
    const cartProduct: ICartProduct = { ...existingProduct };
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

    const deliveryPrice = price > 0 && price < 30 && quantity !== 0 ? 5 : 0;
    let cartList = [];
    if (quantity === 0) {
      cartList = [
        ...state.cartList.slice(0, existingProductIndex),
        ...state.cartList.slice(existingProductIndex + 1),
      ];
    } else {
      cartList = [
        ...state.cartList.slice(0, existingProductIndex),
        cartProduct,
        ...state.cartList.slice(existingProductIndex + 1),
      ];
    }
    return {
      ...state,
      cartList,
      price,
      deliveryPrice,
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
