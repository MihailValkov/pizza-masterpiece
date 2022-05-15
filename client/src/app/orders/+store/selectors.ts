import { createSelector } from '@ngrx/store';
import { IOrderState } from './reducers';

interface ISelectState {
  order: IOrderState;
}

export const selectOrders = (state: ISelectState) => state.order;

export const selectCurrentOrder = createSelector(
  selectOrders,
  (state) => state.currentOrder
);

export const selectCurrentProduct = createSelector(
  selectOrders,
  (state) => state.currentProduct
);

export const selectCurrentProductRates = createSelector(
  selectOrders,
  (state) => state.currentProduct?.rates
);

export const selectCurrentOrderProducts = createSelector(
  selectOrders,
  (state) => state.currentOrder!.products
);

export const selectOrdersList = createSelector(
  selectOrders,
  (state) => state.orders.ordersList
);

export const selectOrdersCount = createSelector(
  selectOrders,
  (state) => state.orders.count
);

export const selectOrderIsLoading = createSelector(
  selectOrders,
  (state) => state.isLoading
);
export const selectOrderErrorMessage = createSelector(
  selectOrders,
  (state) => state.errorMessage
);
