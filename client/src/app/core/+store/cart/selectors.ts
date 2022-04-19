import { createSelector } from '@ngrx/store';
import { ICartState } from './reducers';

interface ISelectState {
  userData: {
    cart: ICartState;
  };
}

export const selectCart = (state: ISelectState) => state.userData.cart;

export const selectCartList = createSelector(
  selectCart,
  (state) => state.cartList
);
export const selectTotalProducts = createSelector(
  selectCart,
  (state) => state.totalProducts
);
export const selectTotalPrice = createSelector(
  selectCart,
  (state) => state.totalPrice
);
export const selectTaxes = createSelector(selectCart, (state) => state.taxes);
