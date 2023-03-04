import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, switchMap, takeUntil, map } from "rxjs";
import { NotificationService } from "src/app/core/notification.service";
import { IErrorResponse } from "src/app/shared/interfaces/error-response";
import { AdminService } from "../../admin.service";
import * as productActions from "./actions";

@Injectable()
export class AdminProductsEffects {
  createProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productActions.createProductStart),
      switchMap(({ productFormData }) =>
        this.adminService.createProduct(productFormData).pipe(
          takeUntil(this.actions$.pipe(ofType(productActions.createProductCancel))),
          map(({ product }) => {
            this.notificationService.showMessage(`${product.name} has been created successfully!`, "success");
            this.router.navigateByUrl("/admin/products");
            return productActions.createProductSuccess({ product });
          }),
          catchError(({ error }: IErrorResponse) => {
            const message = error.message;
            this.notificationService.showMessage(message, "error");
            return [
              productActions.createProductFailure({
                message,
              }),
            ];
          })
        )
      )
    )
  );

  loadProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productActions.loadProductStart),
      switchMap(({ productId }) =>
        this.adminService.loadProduct(productId).pipe(
          takeUntil(this.actions$.pipe(ofType(productActions.loadProductCancel))),
          map(({ product }) => productActions.loadProductSuccess({ product })),
          catchError(({ error }: IErrorResponse) => {
            const message = error.message;
            this.notificationService.showMessage(message, "error");
            return [productActions.loadProductFailure({ message })];
          })
        )
      )
    )
  );

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productActions.loadProductsStart),
      switchMap(({ page, limit, sort, order, searchValue, selectValue }) =>
        this.adminService.loadProducts(page, limit, sort, order, searchValue, selectValue).pipe(
          takeUntil(this.actions$.pipe(ofType(productActions.loadProductsCancel))),
          map(({ products, count }) => {
            this.router.navigateByUrl(
              `/admin/products?page=${
                page + 1
              }&limit=${limit}&sort=${sort}&order=${order}&searchValue=${searchValue}&selectValue=${selectValue}`
            );
            return productActions.loadProductsSuccess({ products, count });
          }),
          catchError(({ error }: IErrorResponse) => {
            const message = error.message;
            this.notificationService.showMessage(message, "error");
            return [productActions.loadProductsFailure({ message })];
          })
        )
      )
    )
  );

  constructor(
    private adminService: AdminService,
    private actions$: Actions,
    private notificationService: NotificationService,
    private router: Router
  ) {}
}
