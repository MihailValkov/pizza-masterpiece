import { createAction, props } from '@ngrx/store';
import { IProduct } from 'src/app/shared/interfaces/product';

const productsNamespace = '[Product]';

export const loadProductStart = createAction(
  `${productsNamespace} Load Product Start`,
  props<{ id: string }>()
);

export const loadProductSuccess = createAction(
  `${productsNamespace} Load Product Success`,
  props<{ product: IProduct }>()
);

export const loadProductFailure = createAction(
  `${productsNamespace} Load Product Failure`,
  props<{ message: string }>()
);

export const loadProductCancel = createAction(
  `${productsNamespace} Load Product Cancel`
);
