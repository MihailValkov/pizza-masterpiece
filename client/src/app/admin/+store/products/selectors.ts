import { createSelector } from '@ngrx/store';
import { IProductsState } from './reducers';

interface ISelectState {
  admin: {
    products: IProductsState;
  };
}

export const selectProducts = (state: ISelectState) => state.admin.products;

export const selectAdminProductsCurrentProduct = createSelector(
  selectProducts,
  (state) => state.currentProduct
);
export const selectAdminProductsIsLoading = createSelector(
  selectProducts,
  (state) => state.isLoading
);
export const selectAdminProductsErrorMessage = createSelector(
  selectProducts,
  (state) => state.errorMessage
);

export const selectAdminProductsProductList = createSelector(
  selectProducts,
  (state) => state.productsList
);
