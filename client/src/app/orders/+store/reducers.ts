import { createReducer, on } from '@ngrx/store';
import { IOrder, IOrderDetail } from 'src/app/shared/interfaces/order';
import * as orderActions from './actions';

export interface IOrderState {
  orders: {
    ordersList: IOrder[];
    count: number;
  };
  currentOrder: IOrderDetail | null;
  isLoading: boolean;
  errorMessage: null | string;
}

const initialOrdersState: IOrderState = {
  orders: {
    ordersList: [],
    count: 0,
  },
  currentOrder: null,
  isLoading: true,
  errorMessage: null,
};

const startFetching = (state: IOrderState) => ({
  ...state,
  isLoading: true,
  errorMessage: null,
});

const setErrorMessage = (
  state: IOrderState,
  { message }: { message: string }
) => ({
  ...state,
  isLoading: false,
  errorMessage: message,
});

export const ordersReducer = createReducer<IOrderState>(
  initialOrdersState,
  on(orderActions.createOrderStart, startFetching),
  on(orderActions.createOrderSuccess, (state: IOrderState, { order }) => {
    return {
      ...state,
      isLoading: false,
      errorMessage: null,
      orders: {
        ordersList: state.orders.ordersList.concat(order),
        count: state.orders.count + 1,
      },
    };
  }),
  on(orderActions.createOrderFailure, setErrorMessage),
  on(orderActions.loadOrderStart, startFetching),
  on(orderActions.loadOrderSuccess, (state, { order }) => {
    const transformedOrderProducts = order.products.map((p) => ({
      ...p,
      isExpanded: false,
    }));

    return {
      ...state,
      isLoading: false,
      errorMessage: null,
      currentOrder: {
        ...order,
        products: transformedOrderProducts,
      },
    };
  }),
  on(orderActions.loadOrderFailure, setErrorMessage),
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
  on(orderActions.clearOrders, (state) => {
    return {
      ...state,
      orders: { ordersList: [], count: 0 },
      errorMessage: null,
      isLoading: true,
    };
  }),
  on(orderActions.rateOrdererProductStart, startFetching),
  on(orderActions.rateOrdererProductSuccess, (state, { productId, rating }) => {
    const products = state.currentOrder!.products.slice();
    const existingProductId = products.findIndex((p) => p._id == productId);

    if (existingProductId && existingProductId !== -1 && products.length > 0) {
      const currentProduct = {
        ...products[existingProductId],
      };
      currentProduct.rating = rating;
      products[existingProductId] = currentProduct;
    }

    return {
      ...state,
      isLoading: false,
      errorMessage: null,
      currentOrder: {
        ...state.currentOrder!,
        products,
      },
    };
  }),
  on(orderActions.rateOrdererProductFailure, setErrorMessage)
);
