import { createAction, props } from '@ngrx/store';
import {
  IAdminBaseProduct,
  IAdminProduct,
} from 'src/app/shared/interfaces/admin';

const adminProductsNamespace = '[Admin - Products]';

// Create a new product
export const createProductStart = createAction(
  `${adminProductsNamespace} Create Start`,
  props<{ productFormData: FormData }>()
);

export const createProductSuccess = createAction(
  `${adminProductsNamespace} Create Success`,
  props<{ product: IAdminBaseProduct }>()
);

export const createProductFailure = createAction(
  `${adminProductsNamespace} Create Failure`,
  props<{ message: string }>()
);

export const createProductCancel = createAction(
  `${adminProductsNamespace} Create Cancel`
);

// Load current product
export const loadProductStart = createAction(
  `${adminProductsNamespace} Load Product Start`,
  props<{ productId: string }>()
);

export const loadProductSuccess = createAction(
  `${adminProductsNamespace} Load Product Success`,
  props<{ product: IAdminProduct }>()
);

export const loadProductFailure = createAction(
  `${adminProductsNamespace} Load Product Failure`,
  props<{ message: string }>()
);

export const loadProductCancel = createAction(
  `${adminProductsNamespace} Load Product Cancel`
);

export const clearProduct = createAction(
  `${adminProductsNamespace} Clear Product`
);

// Load all products
export const loadProductsStart = createAction(
  `${adminProductsNamespace} Load Products Start`,
  props<{
    sort: string;
    order: '' | 'asc' | 'desc';
    limit: number;
    page: number;
    searchValue: string;
    selectValue: string;
  }>()
);

export const loadProductsSuccess = createAction(
  `${adminProductsNamespace} Load Products Success`,
  props<{ products: IAdminBaseProduct[]; count: number }>()
);

export const loadProductsFailure = createAction(
  `${adminProductsNamespace} Load Products Failure`,
  props<{ message: string }>()
);

export const loadProductsCancel = createAction(
  `${adminProductsNamespace} Load Products Cancel`
);

export const clearProducts = createAction(
  `${adminProductsNamespace} Clear Products`
);
