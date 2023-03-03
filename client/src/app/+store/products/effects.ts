import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, switchMap, takeUntil } from "rxjs";
import { NotificationService } from "src/app/core/notification.service";
import { IErrorResponse } from "src/app/shared/interfaces/error-response";
import { ProductService } from "../../products/product.service";
import * as productsActions from "./actions";

@Injectable()
export class ProductsEffects {
  loadProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productsActions.loadProductStart),
      switchMap(({ id }) =>
        this.productService.loadProductById(id).pipe(
          takeUntil(this.actions$.pipe(ofType(productsActions.loadProductCancel))),
          map(({ product }) => productsActions.loadProductSuccess({ product })),
          catchError(({ error }: IErrorResponse) => {
            const message = error.message;
            this.notificationService.showMessage(message, "error");
            return [productsActions.loadProductFailure({ message })];
          })
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
          catchError(({ error }: IErrorResponse) => {
            const message = error.message;
            this.notificationService.showMessage(message, "error");
            return [productsActions.loadProductsFailure({ message })];
          })
        )
      )
    )
  );

  constructor(
    private productService: ProductService,
    private notificationService: NotificationService,
    private router: Router,
    private actions$: Actions
  ) {}
}
