import { createReducer, on } from "@ngrx/store";
import { IBaseAdminOrder, IAdminOrder, IAdminOrderBaseUserInfo, IOrderStatus } from "src/app/shared/interfaces/admin";
import * as ordersActions from "./actions";

export interface IOrdersState {
  orders: {
    ordersList: IBaseAdminOrder<IAdminOrderBaseUserInfo>[];
    count: number;
    orderStatuses: IOrderStatus[];
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
    orderStatuses: [],
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
  on(ordersActions.loadOrdersSuccess, (state: IOrdersState, { orders, count, orderStatuses }) => {
    return {
      ...state,
      orders: {
        ordersList: orders,
        count,
        orderStatuses,
        isLoading: false,
        errorMessage: null,
      },
    };
  }),
  on(ordersActions.loadOrdersFailure, (state: IOrdersState, { message }: { message: string }) => {
    return {
      ...state,
      orders: { ...state.orders, isLoading: false, errorMessage: message },
    };
  }),
  on(ordersActions.clearOrders, (state: IOrdersState) => {
    return {
      ...state,
      orders: {
        ordersList: [],
        orderStatuses: [],
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
  on(ordersActions.loadOrderFailure, (state: IOrdersState, { message }: { message: string }) => {
    return {
      ...state,
      currentOrder: {
        ...state.currentOrder,
        isLoading: false,
        errorMessage: message,
      },
    };
  }),
  on(ordersActions.clearOrder, (state: IOrdersState) => {
    return {
      ...state,
      currentOrder: {
        order: null,
        isLoading: false,
        errorMessage: null,
      },
    };
  }),
  on(ordersActions.changeOrderStatusStart, (state: IOrdersState) => {
    return {
      ...state,
      currentOrder: {
        ...state.currentOrder,
        isLoading: true,
        errorMessage: null,
      },
    };
  }),
  on(ordersActions.changeOrderStatusSuccess, (state: IOrdersState, { status }) => {
    if (!state?.currentOrder?.order?._id || !state?.orders?.ordersList) {
      return state;
    }
    const orderId = state.currentOrder.order._id;
    const copiedOrders = [...state.orders.ordersList.map(o => (o._id === orderId ? { ...o, status } : o))];

    return {
      ...state,
      orders: {
        ...state.orders,
        ordersList: copiedOrders,
      },
      currentOrder: {
        ...state.currentOrder,
        order: {
          ...state.currentOrder.order,
          status,
        },
        isLoading: false,
        errorMessage: null,
      },
    };
  }),
  on(ordersActions.changeOrderStatusFailure, (state: IOrdersState, { message }: { message: string }) => {
    return {
      ...state,
      currentOrder: {
        ...state.currentOrder,
        isLoading: false,
        errorMessage: message,
      },
    };
  })
);
