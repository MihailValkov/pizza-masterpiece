import { createSelector } from "@ngrx/store";
import { IProductsState } from "./reducers";

interface ISelectState {
  admin: {
    products: IProductsState;
  };
}

export const selectProducts = (state: ISelectState) => state.admin.products;

export const selectAdminProductsIsLoading = createSelector(selectProducts, state => state.isLoading);
export const selectAdminProductsErrorMessage = createSelector(selectProducts, state => state.errorMessage);

export const selectAdminProductsCurrentProduct = createSelector(selectProducts, state => state.product.currentProduct);
export const selectAdminProductsCurrentProductIsLoading = createSelector(
  selectProducts,
  state => state.product.isLoading
);
export const selectAdminProductsCurrentProductErrorMessage = createSelector(
  selectProducts,
  state => state.product.errorMessage
);

export const selectAdminProductsProductList = createSelector(selectProducts, state => state.products.productsList);

export const selectAdminProductsProductListCount = createSelector(selectProducts, state => state.products.count);

export const selectAdminProductsProductListIsLoading = createSelector(
  selectProducts,
  state => state.products.isLoading
);
export const selectAdminProductsProductListErrorMessage = createSelector(
  selectProducts,
  state => state.products.errorMessage
);
