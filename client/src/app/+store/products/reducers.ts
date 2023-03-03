import { createReducer, on } from "@ngrx/store";
import { IProduct } from "src/app/shared/interfaces/product";
import * as productsActions from "./actions";

export interface IProductsState {
  currentProduct: IProduct | null;
  products: {
    productsList: IProduct[];
    count: number;
  };
  isLoading: boolean;
  message: string | null;
}

const initialAuthState: IProductsState = {
  currentProduct: null,
  products: {
    productsList: [],
    count: 0,
  },
  isLoading: true,
  message: null,
};

const setErrorMessage = (state: IProductsState, { message }: { message: string }) => ({
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
  on(productsActions.loadProductSuccess, (state: IProductsState, { product }: { product: IProduct }) => {
    return { ...state, isLoading: false, currentProduct: product };
  }),
  on(productsActions.loadProductFailure, setErrorMessage),
  on(productsActions.clearProduct, state => {
    return { ...state, currentProduct: null };
  }),
  on(productsActions.loadProductsStart, startFetching),
  on(
    productsActions.loadProductsSuccess,
    (state: IProductsState, { products, count }: { products: IProduct[]; count: number }) => {
      return {
        ...state,
        isLoading: false,
        products: {
          productsList: state.products.productsList.concat(products),
          count,
        },
      };
    }
  ),
  on(productsActions.loadProductsFailure, setErrorMessage),
  on(productsActions.clearProducts, state => {
    return { ...state, products: { productsList: [], count: 0 } };
  })
);
