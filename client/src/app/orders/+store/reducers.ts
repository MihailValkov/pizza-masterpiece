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
    return {
      ...state,
      isLoading: false,
      errorMessage: null,
      currentOrder: order,
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
  on(orderActions.loadOrdersFailure, setErrorMessage)
);
