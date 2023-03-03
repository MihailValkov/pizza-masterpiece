import { createAction, props } from "@ngrx/store";
import { IAdminOrder, IAdminOrderBaseUserInfo, IBaseAdminOrder, IOrderStatus } from "src/app/shared/interfaces/admin";

const adminOrdersNamespace = "[Admin - Orders]";

// Load Orders
export const loadOrdersStart = createAction(
  `${adminOrdersNamespace} Load Orders Start`,
  props<{
    sort: string;
    order: "" | "asc" | "desc";
    limit: number;
    page: number;
    searchValue: string;
    selectValue: string;
  }>()
);

export const loadOrdersSuccess = createAction(
  `${adminOrdersNamespace} Load Orders Success`,
  props<{
    orders: IBaseAdminOrder<IAdminOrderBaseUserInfo>[];
    count: number;
    orderStatuses: IOrderStatus[];
  }>()
);

export const loadOrdersFailure = createAction(
  `${adminOrdersNamespace} Load Orders Failure`,
  props<{ message: string }>()
);

export const loadOrdersCancel = createAction(`${adminOrdersNamespace} Load Orders Cancel`);

export const clearOrders = createAction(`${adminOrdersNamespace} Clear Orders`);

// Load Order
export const loadOrderStart = createAction(
  `${adminOrdersNamespace} Load Order Start`,
  props<{
    orderId: string;
  }>()
);

export const loadOrderSuccess = createAction(
  `${adminOrdersNamespace} Load Order Success`,
  props<{ order: IAdminOrder }>()
);

export const loadOrderFailure = createAction(
  `${adminOrdersNamespace} Load Order Failure`,
  props<{ message: string }>()
);

export const loadOrderCancel = createAction(`${adminOrdersNamespace} Load Order Cancel`);

export const clearOrder = createAction(`${adminOrdersNamespace} Clear Order`);

// Change order status
export const changeOrderStatusStart = createAction(
  `${adminOrdersNamespace} Change Order Status Start`,
  props<{
    orderId: string;
    status: IOrderStatus;
  }>()
);

export const changeOrderStatusSuccess = createAction(
  `${adminOrdersNamespace} Change Order Status Success`,
  props<{ status: IOrderStatus }>()
);

export const changeOrderStatusFailure = createAction(
  `${adminOrdersNamespace} Change Order Status Failure`,
  props<{ message: string }>()
);

export const changeOrderStatusCancel = createAction(`${adminOrdersNamespace} Change Order Status Cancel`);
