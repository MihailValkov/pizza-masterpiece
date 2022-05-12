import { createReducer, on } from '@ngrx/store';
import {
  IBaseAdminOrder,
  IAdminOrder,
  IAdminOrderBaseUserInfo,
} from 'src/app/shared/interfaces/admin';
import * as ordersActions from './actions';

export interface IOrdersState {
  orders: {
    ordersList: IBaseAdminOrder<IAdminOrderBaseUserInfo>[];
    count: number;
    isLoading: boolean;
    errorMessage: null | string;
  };
  currentOrder: {
    order: IAdminOrder | null;
    isLoading: boolean;
    errorMessage: null | string;
  };
}

const initialOrdersState: IOrdersState = {
  orders: {
    ordersList: [],
    count: 0,
    isLoading: true,
    errorMessage: null,
  },
  currentOrder: {
    order: null,
    isLoading: false,
    errorMessage: null,
  },
};

export const ordersReducer = createReducer<IOrdersState>(
  initialOrdersState,
  on(ordersActions.loadOrdersStart, (state: IOrdersState) => {
    return {
      ...state,
      orders: { ...state.orders, isLoading: true, errorMessage: null },
    };
  }),
  on(
    ordersActions.loadOrdersSuccess,
    (state: IOrdersState, { orders, count }) => {
      return {
        ...state,
        orders: {
          ordersList: orders,
          count,
          isLoading: false,
          errorMessage: null,
        },
      };
    }
  ),
  on(
    ordersActions.loadOrdersFailure,
    (state: IOrdersState, { message }: { message: string }) => {
      return {
        ...state,
        orders: { ...state.orders, isLoading: false, errorMessage: message },
      };
    }
  ),
  on(ordersActions.clearOrders, (state: IOrdersState) => {
    return {
      ...state,
      orders: {
        ordersList: [],
        count: 0,
        isLoading: true,
        errorMessage: null,
      },
    };
  }),
  on(ordersActions.loadOrderStart, (state: IOrdersState) => {
    return {
      ...state,
      currentOrder: {
        order: null,
        isLoading: true,
        errorMessage: null,
      },
    };
  }),
  on(ordersActions.loadOrderSuccess, (state: IOrdersState, { order }) => {
    return {
      ...state,
      currentOrder: {
        order,
        isLoading: false,
        errorMessage: null,
      },
    };
  }),
  on(
    ordersActions.loadOrderFailure,
    (state: IOrdersState, { message }: { message: string }) => {
      return {
        ...state,
        currentOrder: {
          ...state.currentOrder,
          isLoading: false,
          errorMessage: message,
        },
      };
    }
  ),
  on(ordersActions.clearOrder, (state: IOrdersState) => {
    return {
      ...state,
      currentOrder: {
        order: null,
        isLoading: false,
        errorMessage: null,
      },
    };
  })
);
