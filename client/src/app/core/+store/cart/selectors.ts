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
export const selectPrice = createSelector(selectCart, (state) => state.price);
export const selectTaxes = createSelector(selectCart, (state) => state.taxes);

export const selectCheckoutIsLoading = createSelector(
  selectCart,
  (state) => state.isLoading
);
export const selectCheckoutErrorMessage = createSelector(
  selectCart,
  (state) => state.errorMessage
);
export const selectCheckoutLastOrderId = createSelector(
  selectCart,
  (state) => state.lastCreatedOrderId
);
