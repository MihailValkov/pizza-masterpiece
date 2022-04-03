import { createReducer, on } from '@ngrx/store';
import { IProduct } from 'src/app/shared/interfaces/product';
import * as productsActions from './actions';

export interface IProductsState {
  currentProduct: IProduct | null;
  productsList: IProduct[];
  isLoading: boolean;
  message: string | null;
}

const initialAuthState: IProductsState = {
  currentProduct: null,
  productsList: [],
  isLoading: false,
  message: null,
};

const setErrorMessage = (
  state: IProductsState,
  { message }: { message: string }
) => ({
  ...state,
  message,
  isLoading: false,
});

const startFetching = (state: IProductsState) => ({
  ...state,
  isLoading: true,
  message: null,
});

export const productsReducer = createReducer<IProductsState>(
  initialAuthState,
  on(productsActions.loadProductStart, startFetching),
  on(
    productsActions.loadProductSuccess,
    (state: IProductsState, { product }: { product: IProduct }) => {
      return { ...state, currentProduct: product };
    }
  ),
  on(productsActions.loadProductFailure, setErrorMessage)
);
