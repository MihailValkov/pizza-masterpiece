import { createAction, props } from '@ngrx/store';
import { IOrder, IOrderDetail } from 'src/app/shared/interfaces/order';

const orderNamespace = '[Orders]';

// Create new order
export const createOrderStart = createAction(
  `${orderNamespace} Create Start`,
  props<{ order: IOrder }>()
);

export const createOrderSuccess = createAction(
  `${orderNamespace} Create Success`,
  props<{ order: IOrder }>()
);

export const createOrderFailure = createAction(
  `${orderNamespace} Create Failure`,
  props<{ message: string }>()
);

export const createOrderCancel = createAction(
  `${orderNamespace} Create Cancel`
);

// Load all orders
export const loadOrdersStart = createAction(
  `${orderNamespace} Load Orders Start`,
  props<{
    sort: string;
    order: '' | 'asc' | 'desc';
    limit: number;
    page: number;
  }>()
);

export const loadOrdersSuccess = createAction(
  `${orderNamespace} Load Orders Success`,
  props<{ ordersList: IOrder[]; count: number }>()
);

export const loadOrdersFailure = createAction(
  `${orderNamespace} Load Orders Failure`,
  props<{ message: string }>()
);

export const loadOrdersCancel = createAction(
  `${orderNamespace} Load Orders Cancel`
);

// Load order
export const loadOrderStart = createAction(
  `${orderNamespace} Load Order Start`,
  props<{ orderId: string }>()
);

export const loadOrderSuccess = createAction(
  `${orderNamespace} Load Order Success`,
  props<{ order: IOrderDetail }>()
);

export const loadOrderFailure = createAction(
  `${orderNamespace} Load Order Failure`,
  props<{ message: string }>()
);

export const loadOrderCancel = createAction(
  `${orderNamespace} Load Order Cancel`
);

// Rate ordered product
export const rateOrdererProductStart = createAction(
  `${orderNamespace} Rate Product Start`,
  props<{
    orderId: string;
    productId: string;
    rate: number;
    comment: string;
  }>()
);

export const rateOrdererProductSuccess = createAction(
  `${orderNamespace} Rate Product Success`,
  props<{ productId: string; rating: number }>()
);

export const rateOrdererProductFailure = createAction(
  `${orderNamespace} Rate Product Failure`,
  props<{ message: string }>()
);

export const rateOrdererProductCancel = createAction(
  `${orderNamespace} Rate Product Cancel`
);
