import { createReducer, on } from '@ngrx/store';
import {
  IAdminBaseProduct,
  IAdminProduct,
} from 'src/app/shared/interfaces/admin';
import * as productActions from './actions';
export interface IProductsState {
  product: {
    currentProduct: IAdminProduct | null;
    isLoading: boolean;
    errorMessage: null | string;
  };
  products: {
    productsList: IAdminBaseProduct[];
    count: number;
    isLoading: boolean;
    errorMessage: null | string;
  };
  isLoading: boolean;
  errorMessage: null | string;
}

const initialProductsState: IProductsState = {
  product: {
    currentProduct: null,
    isLoading: false,
    errorMessage: null,
  },
  products: {
    productsList: [],
    count: 0,
    isLoading: true,
    errorMessage: null,
  },
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
    (state: IProductsState, { product }) => {
      return {
        ...state,
        products: {
          ...state.products,
          productsList: state.products.productsList.concat(product),
        },
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
    return {
      ...state,
      product: { ...state.product, isLoading: true, errorMessage: null },
    };
  }),
  on(
    productActions.loadProductSuccess,
    (state: IProductsState, { product }) => {
      return {
        ...state,
        product: {
          ...state.product,
          currentProduct: product,
          isLoading: false,
          errorMessage: null,
        },
      };
    }
  ),
  on(
    productActions.loadProductFailure,
    (state: IProductsState, { message }: { message: string }) => {
      return {
        ...state,
        product: { ...state.product, isLoading: false, errorMessage: message },
      };
    }
  ),
  on(productActions.clearProduct, (state: IProductsState) => {
    return {
      ...state,
      product: {
        currentProduct: null,
        isLoading: false,
        errorMessage: null,
      },
    };
  }),
  on(productActions.loadProductsStart, (state: IProductsState) => {
    return {
      ...state,
      products: {
        ...state.products,
        isLoading: true,
        errorMessage: null,
      },
    };
  }),
  on(
    productActions.loadProductsSuccess,
    (state: IProductsState, { products, count }) => {
      return {
        ...state,
        products: {
          ...state.products,
          productsList: products,
          count,
          isLoading: false,
          errorMessage: null,
        },
      };
    }
  ),
  on(
    productActions.loadProductsFailure,
    (state: IProductsState, { message }: { message: string }) => {
      return {
        ...state,
        products: {
          ...state.products,
          isLoading: false,
          errorMessage: message,
        },
      };
    }
  ),
  on(productActions.clearProducts, (state: IProductsState) => {
    return {
      ...state,
      products: {
        productsList: [],
        count: 0,
        isLoading: true,
        errorMessage: null,
      },
    };
  })
);
