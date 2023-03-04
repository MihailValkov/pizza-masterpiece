import { combineReducers } from "@ngrx/store";
import { IRootState } from "src/app/+store";
import { AdminOrdersEffects } from "./orders/effects";
import { productsReducers } from "./products";
import { AdminProductsEffects } from "./products/effects";
import { IProductsState } from "./products/reducers";
import { usersReducers } from "./users";
import { AdminUsersEffects } from "./users/effects";
import { IUsersState } from "./users/reducers";
import { ordersReducers } from "./orders";
import { IOrdersState } from "./orders/reducers";

export interface IAdminModuleState extends IRootState {
  readonly admin: {
    products: IProductsState;
    users: IUsersState;
    orders: IOrdersState;
  };
}

export const reducers = combineReducers({
  products: productsReducers.products,
  users: usersReducers.users,
  orders: ordersReducers.orders,
});

export const AdminEffects = [AdminProductsEffects, AdminUsersEffects, AdminOrdersEffects];
