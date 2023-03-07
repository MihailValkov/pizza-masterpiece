import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, switchMap, takeUntil } from "rxjs";
import { NotificationService } from "src/app/core/notification.service";
import { IErrorResponse } from "src/app/shared/interfaces/error-response";
import { ProductService } from "../../products/product.service";
import * as productsActions from "./actions";

type FailureActions = typeof productsActions.loadProductFailure | typeof productsActions.loadProductsFailure;

@Injectable()
export class ProductsEffects {

  loadProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productsActions.loadProductStart),
      switchMap(({ id }) =>
        this.productService.loadProductById(id).pipe(
          takeUntil(this.actions$.pipe(ofType(productsActions.loadProductCancel))),
          map(({ product }) => productsActions.loadProductSuccess({ product })),
          catchError(err => this.catchErrorMessage(err, productsActions.loadProductFailure))
        )
      )
    )
  );

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productsActions.loadProductsStart),
      switchMap(({ page, limit }) =>
        this.productService.loadAllProducts(page, limit).pipe(
          takeUntil(this.actions$.pipe(ofType(productsActions.loadProductsCancel))),
          map(({ products, count }) => {
            return productsActions.loadProductsSuccess({ products, count });
          }),
          catchError(err => this.catchErrorMessage(err, productsActions.loadProductsFailure))
        )
      )
    )
  );

  constructor(
    private productService: ProductService,
    private notificationService: NotificationService,
    private actions$: Actions
  ) {}

  private catchErrorMessage(err: IErrorResponse, action: FailureActions) {
    const message = err.error.message;
    this.notificationService.showMessage(message, "error");
    return [action({ message })];
  }
}
