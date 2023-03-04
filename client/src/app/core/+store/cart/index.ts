import { ActionReducerMap } from "@ngrx/store";
import { cartReducer, ICartState } from "./reducers";

export interface IUserCartState {
  readonly cart: ICartState;
}

export const cartReducers: ActionReducerMap<IUserCartState> = {
  cart: cartReducer,
};
