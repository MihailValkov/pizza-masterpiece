import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, switchMap, takeUntil, map } from 'rxjs';
import { IErrorResponse } from 'src/app/shared/interfaces/error-response';
import { IProduct } from 'src/app/shared/interfaces/product';

import { AdminService } from '../../admin.service';
import * as productActions from './actions';

@Injectable()
export class AdminProductsEffect {
  
  createProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productActions.createProductStart),
      switchMap(({ productFormData }) =>
        this.adminService.createProduct(productFormData).pipe(
          takeUntil(
            this.actions$.pipe(ofType(productActions.createProductCancel))
          ),
          map((product: IProduct) => {
            this.router.navigateByUrl('/admin/products');
            return productActions.createProductSuccess({ product });
          }),
          catchError((err: IErrorResponse) => [
            productActions.createProductFailure({ message: err.error.message }),
          ])
        )
      )
    )
  );

  loadProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productActions.loadProductStart),
      switchMap(({ id }) =>
        this.adminService.loadProduct(id).pipe(
          takeUntil(
            this.actions$.pipe(ofType(productActions.loadProductCancel))
          ),
          map((product: IProduct) =>
            productActions.loadProductSuccess({ product })
          ),
          catchError((err: IErrorResponse) => [
            productActions.loadProductFailure({ message: err.error.message }),
          ])
        )
      )
    )
  );

  constructor(
    private adminService: AdminService,
    private actions$: Actions,
    private router: Router
  ) {}
}
