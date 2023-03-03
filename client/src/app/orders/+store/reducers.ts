import { createReducer, on } from "@ngrx/store";
import { IOrder, IOrderDetail, IOrderProductDetail } from "src/app/shared/interfaces/order";
import * as orderActions from "./actions";

export interface IOrderState {
  orders: {
    ordersList: IOrder[];
    count: number;
  };
  currentOrder: IOrderDetail | null;
  currentProduct: IOrderProductDetail | null;
  isLoading: boolean;
  errorMessage: null | string;
}

const initialOrdersState: IOrderState = {
  orders: {
    ordersList: [],
    count: 0,
  },
  currentOrder: null,
  currentProduct: null,
  isLoading: true,
  errorMessage: null,
};

const startFetching = (state: IOrderState) => ({
  ...state,
  isLoading: true,
  errorMessage: null,
});

const setErrorMessage = (state: IOrderState, { message }: { message: string }) => ({
  ...state,
  isLoading: false,
  errorMessage: message,
});

export const ordersReducer = createReducer<IOrderState>(
  initialOrdersState,
  on(orderActions.loadOrderStart, startFetching),
  on(orderActions.loadOrderSuccess, (state, { order }) => {
    return {
      ...state,
      isLoading: false,
      errorMessage: null,
      currentOrder: order,
    };
  }),
  on(orderActions.loadOrderFailure, setErrorMessage),
  on(orderActions.clearOrder, state => {
    return {
      ...state,
      currentOrder: null,
      errorMessage: null,
      isLoading: true,
    };
  }),
  on(orderActions.loadOrdersStart, startFetching),
  on(orderActions.loadOrdersSuccess, (state, { ordersList, count }) => {
    return {
      ...state,
      isLoading: false,
      errorMessage: null,
      orders: { ordersList, count },
    };
  }),
  on(orderActions.loadOrdersFailure, setErrorMessage),
  on(orderActions.clearOrders, state => {
    return {
      ...state,
      orders: { ordersList: [], count: 0 },
      errorMessage: null,
      isLoading: true,
    };
  }),
  on(orderActions.loadOrderProductStart, startFetching),
  on(orderActions.loadOrderProductSuccess, (state, { product }) => {
    return {
      ...state,
      isLoading: false,
      errorMessage: null,
      currentProduct: product,
    };
  }),
  on(orderActions.loadOrdersFailure, setErrorMessage),
  on(orderActions.clearOrderProduct, state => {
    return {
      ...state,
      errorMessage: null,
      isLoading: true,
      currentProduct: null,
    };
  }),
  on(orderActions.rateOrdererProductStart, startFetching),
  on(orderActions.rateOrdererProductSuccess, (state, { rating }) => {
    if (state.currentProduct) {
      return {
        ...state,
        isLoading: false,
        errorMessage: null,
        currentProduct: { ...state.currentProduct, rating },
      };
    }
    return state;
  }),
  on(orderActions.rateOrdererProductFailure, setErrorMessage)
);
