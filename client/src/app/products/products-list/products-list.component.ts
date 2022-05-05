import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { IRootState } from 'src/app/+store';
import {
  clearProducts,
  loadProductsStart,
} from '../../+store/products/actions';
import {
  selectErrorMessage,
  selectProductsList,
  selectProductsListCount,
  selectIsLoading,
} from '../../+store/products/selectors';
@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit, OnDestroy {
  products$ = this.store.pipe(select(selectProductsList));
  productsCount$ = this.store.pipe(select(selectProductsListCount));
  errorMessage$ = this.store.pipe(select(selectErrorMessage));
  isLoading$ = this.store.pipe(select(selectIsLoading));

  page = 0;
  limit = 8;

  constructor(private store: Store<IRootState>) {}

  ngOnInit(): void {
    this.onScrollDown(1);
  }

  onScrollDown(count: number) {
    const maxPages = Math.ceil(count / this.limit);

    if (maxPages > this.page) {
      this.page++;
      this.store.dispatch(
        loadProductsStart({
          page: this.page,
          limit: this.limit,
        })
      );
    }
  }
  ngOnDestroy(): void {
    this.store.dispatch(clearProducts());
  }
}
