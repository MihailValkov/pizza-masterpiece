import { createAction, props } from '@ngrx/store';
import { ICartProduct } from 'src/app/shared/interfaces/product';

const cartNamespace = '[Cart]';

export const addProductToCart = createAction(
  `${cartNamespace} Add to cart`,
  props<{ product: ICartProduct }>()
);

export const updateProductQuantity = createAction(
  `${cartNamespace} Update product quantity`,
  props<{ index: number; actionType: 'increase' | 'decrease' }>()
);

export const removeProductFromCart = createAction(
  `${cartNamespace} Remove from cart`,
  props<{ index: number }>()
);
