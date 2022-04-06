import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, takeUntil } from 'rxjs';
import { IErrorResponse } from 'src/app/shared/interfaces/error-response';
import { IProduct } from 'src/app/shared/interfaces/product';
import { ProductService } from '../product.service';
import * as productsActions from './actions';

@Injectable()
export class ProductsEffects {
  loadProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productsActions.loadProductStart),
      switchMap(({ id }) =>
        this.productService.loadProductById(id).pipe(
          takeUntil(
            this.actions$.pipe(ofType(productsActions.loadProductCancel))
          ),
          map((product) => productsActions.loadProductSuccess({ product })),
          catchError(({ error }: IErrorResponse) => [
            productsActions.loadProductFailure({ message: error.message }),
          ])
        )
      )
    )
  );

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productsActions.loadProductsStart),
      switchMap(() =>
        this.productService.loadAllProducts().pipe(
          takeUntil(
            this.actions$.pipe(ofType(productsActions.loadProductsCancel))
          ),
          map((products: IProduct[]) =>
            productsActions.loadProductsSuccess({ products })
          ),
          catchError(({ error }: IErrorResponse) => [
            productsActions.loadProductsFailure({ message: error.message }),
          ])
        )
      )
    )
  );

  constructor(
    private productService: ProductService,
    private router: Router,
    private actions$: Actions
  ) {}
}
