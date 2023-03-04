import { createSelector } from "@ngrx/store";
import { IOrdersState } from "./reducers";

interface ISelectState {
  admin: {
    orders: IOrdersState;
  };
}

export const selectOrders = (state: ISelectState) => state.admin.orders;

export const selectAdminOrdersList = createSelector(selectOrders, state => state.orders.ordersList);

export const selectAdminOrdersListCount = createSelector(selectOrders, state => state.orders.count);

export const selectAdminOrdersIsLoading = createSelector(selectOrders, state => state.orders.isLoading);

export const selectAdminOrdersErrorMessage = createSelector(selectOrders, state => state.orders.errorMessage);

export const selectAdminOrdersStatuses = createSelector(selectOrders, state => state.orders.orderStatuses);

export const selectAdminCurrentOrder = createSelector(selectOrders, state => state.currentOrder.order);

export const selectAdminCurrentOrderIsLoading = createSelector(selectOrders, state => state.currentOrder.isLoading);

export const selectAdminCurrentOrderErrorMessage = createSelector(
  selectOrders,
  state => state.currentOrder.errorMessage
);
