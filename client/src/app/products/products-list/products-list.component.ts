import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IRootState } from 'src/app/+store';
import { loadProductsStart } from '../../+store/products/actions';
import {
  selectErrorMessage,
  selectProductsList,
} from '../../+store/products/selectors';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit {
  products$ = this.store.pipe(select(selectProductsList));
  errorMessage$ = this.store.pipe(select(selectErrorMessage));

  constructor(private store: Store<IRootState>) {}

  ngOnInit(): void {
    this.store.dispatch(loadProductsStart());
  }
}
