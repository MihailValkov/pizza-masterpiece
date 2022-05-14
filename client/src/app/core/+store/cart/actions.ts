import { createAction, props } from '@ngrx/store';
import { IOrder } from 'src/app/shared/interfaces/order';
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
  props<{ uniqueId: string; actionType: 'increase' | 'decrease' }>()
);

export const removeProductFromCart = createAction(
  `${cartNamespace} Remove from cart start`,
  props<{ uniqueId: string }>()
);

export const removeProductFromCartSuccess = createAction(
  `${cartNamespace} Remove from cart success`
);

// Create new order
export const completeCheckoutStart = createAction(
  `${cartNamespace} Complete checkout Start`,
  props<{ order: IOrder }>()
);

export const completeCheckoutSuccess = createAction(
  `${cartNamespace} Complete checkout Success`,
  props<{ orderId: string }>()
);

export const completeCheckoutFailure = createAction(
  `${cartNamespace} Complete checkout Failure`,
  props<{ message: string }>()
);

export const completeCheckoutCancel = createAction(
  `${cartNamespace} Complete checkout Cancel`
);

export const clearCart = createAction(`${cartNamespace} Clear cart`);
