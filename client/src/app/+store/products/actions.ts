import { createAction, props } from "@ngrx/store";
import { IProduct } from "src/app/shared/interfaces/product";

const productsNamespace = "[Product]";

// Load Product
export const loadProductStart = createAction(`${productsNamespace} Load Product Start`, props<{ id: string }>());

export const loadProductSuccess = createAction(
  `${productsNamespace} Load Product Success`,
  props<{ product: IProduct }>()
);

export const loadProductFailure = createAction(
  `${productsNamespace} Load Product Failure`,
  props<{ message: string }>()
);

export const loadProductCancel = createAction(`${productsNamespace} Load Product Cancel`);

export const clearProduct = createAction(`${productsNamespace} Clear Product`);

// Load Products
export const loadProductsStart = createAction(
  `${productsNamespace} Load Products Start`,
  props<{ page: number; limit: number }>()
);

export const loadProductsSuccess = createAction(
  `${productsNamespace} Load Products Success`,
  props<{ products: IProduct[]; count: number }>()
);

export const loadProductsFailure = createAction(
  `${productsNamespace} Load Products Failure`,
  props<{ message: string }>()
);

export const loadProductsCancel = createAction(`${productsNamespace} Load Products Cancel`);

export const clearProducts = createAction(`${productsNamespace} Clear Products`);
