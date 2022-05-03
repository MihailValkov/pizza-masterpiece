import { createAction, props } from '@ngrx/store';
import { ICartProduct } from 'src/app/shared/interfaces/product';

const cartNamespace = '[Cart]';

export const addProductToCart = createAction(
  `${cartNamespace} Add to cart start`,
  props<{ product: ICartProduct }>()
);

export const addProductToCartSuccess = createAction(
  `${cartNamespace} Add to cart success`
);

export const updateProductQuantity = createAction(
  `${cartNamespace} Update product quantity start`,
  props<{ index: number; actionType: 'increase' | 'decrease' }>()
);

export const removeProductFromCart = createAction(
  `${cartNamespace} Remove from cart start`,
  props<{ index: number }>()
);

export const removeProductFromCartSuccess = createAction(
  `${cartNamespace} Remove from cart success`
);
