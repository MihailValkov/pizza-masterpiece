import { createSelector } from "@ngrx/store";
import { IProductsState } from "./reducers";

interface ISelectState {
  products: IProductsState;
}

export const selectProduct = (state: ISelectState) => state.products;

export const selectCurrentProduct = createSelector(selectProduct, state => state.currentProduct);

export const selectProductIsLoading = createSelector(selectProduct, state => state.isLoading);
export const selectProductErrorMessage = createSelector(selectProduct, state => state.message);
export const selectProductsList = createSelector(selectProduct, state => state.products.productsList);
export const selectProductsListCount = createSelector(selectProduct, state => state.products.count);
