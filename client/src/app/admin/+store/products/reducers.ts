import { createReducer, on } from '@ngrx/store';
import { IProduct } from 'src/app/shared/interfaces/product';
import * as productActions from './actions';

export interface IProductsState {
  currentProduct: IProduct | null;
  productsList: IProduct[];
  isLoading: boolean;
  errorMessage: null | string;
}

const initialProductsState: IProductsState = {
  currentProduct: null,
  productsList: [],
  isLoading: false,
  errorMessage: null,
};

export const productsReducer = createReducer<IProductsState>(
  initialProductsState,
  on(productActions.createProductStart, (state: IProductsState) => {
    return { ...state, isLoading: true, errorMessage: null };
  }),
  on(
    productActions.createProductSuccess,
    (state: IProductsState, { product }: { product: IProduct }) => {
      return {
        ...state,
        isLoading: false,
        errorMessage: null,
        productsList: state.productsList.concat(product),
      };
    }
  ),
  on(
    productActions.createProductFailure,
    (state: IProductsState, { message }: { message: string }) => {
      return { ...state, isLoading: false, errorMessage: message };
    }
  ),
  on(productActions.loadProductStart, (state: IProductsState) => {
    return { ...state, isLoading: true, errorMessage: null };
  }),
  on(
    productActions.loadProductSuccess,
    (state: IProductsState, { product }: { product: IProduct }) => {
      return {
        ...state,
        isLoading: false,
        errorMessage: null,
        currentProduct: product,
      };
    }
  ),
  on(
    productActions.loadProductFailure,
    (state: IProductsState, { message }: { message: string }) => {
      return { ...state, isLoading: false, errorMessage: message };
    }
  )
);
