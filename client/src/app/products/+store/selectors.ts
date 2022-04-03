import { createSelector } from '@ngrx/store';
import { IProductsState } from './reducers';

interface ISelectState {
  product: IProductsState;
}

export const selectProduct = (state: ISelectState) => state.product;

export const selectCurrentProduct = createSelector(
  selectProduct,
  (state) => state.currentProduct
);
export const selectIsLoading = createSelector(
  selectProduct,
  (state) => state.isLoading
);
export const selectErrorMessage = createSelector(
  selectProduct,
  (state) => state.message
);
export const selectProductsList = createSelector(
  selectProduct,
  (state) => state.productsList
);
