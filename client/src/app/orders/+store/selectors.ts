import { createSelector } from '@ngrx/store';
import { IOrderState } from './reducers';

interface ISelectState {
  order: IOrderState;
}

export const selectProducts = (state: ISelectState) => state.order;

export const selectCurrentOrder = createSelector(
  selectProducts,
  (state) => state.currentOrder
);

export const selectCurrentOrderProducts = createSelector(
  selectProducts,
  (state) => state.currentOrder!.products
);

export const selectOrders = createSelector(
  selectProducts,
  (state) => state.orders.ordersList
);
export const selectOrdersCount = createSelector(
  selectProducts,
  (state) => state.orders.count
);
export const selectOrderIsLoading = createSelector(
  selectProducts,
  (state) => state.isLoading
);
export const selectOrderErrorMessage = createSelector(
  selectProducts,
  (state) => state.errorMessage
);
