import { ActionReducerMap } from "@ngrx/store";
import { productsReducer, IProductsState } from "./reducers";

export interface IAdminProductsState {
  readonly products: IProductsState;
}

export const productsReducers: ActionReducerMap<IAdminProductsState> = {
  products: productsReducer,
};
