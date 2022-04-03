import { createSelector } from '@ngrx/store';
import { IProductsState } from './reducers';

interface ISelectState {
  admin: {
    products: IProductsState;
  };
}

export const selectProducts = (state: ISelectState) => state.admin.products;

export const selectCurrentProduct = createSelector(
  selectProducts,
  (state) => state.currentProduct
);
export const selectIsLoading = createSelector(
  selectProducts,
  (state) => state.isLoading
);
export const selectErrorMessage = createSelector(
  selectProducts,
  (state) => state.errorMessage
);

export const selectProductList = createSelector(
  selectProducts,
  (state) => state.productsList
);
