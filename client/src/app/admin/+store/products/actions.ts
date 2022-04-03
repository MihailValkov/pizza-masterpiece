import { createAction, props } from '@ngrx/store';
import { IProduct } from 'src/app/shared/interfaces/product';

const adminProductsNamespace = '[Admin - Products]';

export const createProductStart = createAction(
  `${adminProductsNamespace} Create Start`,
  props<{ productFormData: FormData }>()
);

export const createProductSuccess = createAction(
  `${adminProductsNamespace} Create Success`,
  props<{ product: IProduct }>()
);

export const createProductFailure = createAction(
  `${adminProductsNamespace} Create Failure`,
  props<{ message: string }>()
);

export const createProductCancel = createAction(
  `${adminProductsNamespace} Create Cancel`
);

export const loadProductStart = createAction(
  `${adminProductsNamespace} Load Product Start`,
  props<{ id: string }>()
);

export const loadProductSuccess = createAction(
  `${adminProductsNamespace} Load Product Success`,
  props<{ product: IProduct }>()
);

export const loadProductFailure = createAction(
  `${adminProductsNamespace} Load Product Failure`,
  props<{ message: string }>()
);

export const loadProductCancel = createAction(
  `${adminProductsNamespace} Load Product Cancel`
);
