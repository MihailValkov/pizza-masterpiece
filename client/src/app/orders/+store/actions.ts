import { createAction, props } from "@ngrx/store";
import { IOrder, IOrderDetail, IOrderProductDetail } from "src/app/shared/interfaces/order";

const orderNamespace = "[Orders]";

// Load all orders
export const loadOrdersStart = createAction(
  `${orderNamespace} Load Orders Start`,
  props<{
    sort: string;
    order: "" | "asc" | "desc";
    limit: number;
    page: number;
  }>()
);

export const loadOrdersSuccess = createAction(
  `${orderNamespace} Load Orders Success`,
  props<{ ordersList: IOrder[]; count: number }>()
);

export const loadOrdersFailure = createAction(`${orderNamespace} Load Orders Failure`, props<{ message: string }>());

export const loadOrdersCancel = createAction(`${orderNamespace} Load Orders Cancel`);

export const clearOrders = createAction(`${orderNamespace} Clear Orders`);

// Load order
export const loadOrderStart = createAction(`${orderNamespace} Load Order Start`, props<{ orderId: string }>());

export const loadOrderSuccess = createAction(`${orderNamespace} Load Order Success`, props<{ order: IOrderDetail }>());

export const loadOrderFailure = createAction(`${orderNamespace} Load Order Failure`, props<{ message: string }>());

export const loadOrderCancel = createAction(`${orderNamespace} Load Order Cancel`);

export const clearOrder = createAction(`${orderNamespace} Clear Order`);

// Load order product
export const loadOrderProductStart = createAction(
  `${orderNamespace} Load Order Product Start`,
  props<{ orderId: string; _id: string }>()
);

export const loadOrderProductSuccess = createAction(
  `${orderNamespace} Load Order Product Success`,
  props<{ product: IOrderProductDetail }>()
);

export const loadOrderProductFailure = createAction(
  `${orderNamespace} Load Order Product Failure`,
  props<{ message: string }>()
);

export const loadOrderProductCancel = createAction(`${orderNamespace} Load Order Product Cancel`);

export const clearOrderProduct = createAction(`${orderNamespace} Clear Order Product`);

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

export const rateOrdererProductCancel = createAction(`${orderNamespace} Rate Product Cancel`);
