import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IProductModuleState } from '../+store';
import { loadProductsStart } from '../+store/actions';
import { selectErrorMessage, selectProductsList } from '../+store/selectors';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit {
  products$ = this.store.pipe(select(selectProductsList));
  errorMessage$ = this.store.pipe(select(selectErrorMessage));

  constructor(private store: Store<IProductModuleState>) {}

  ngOnInit(): void {
    this.store.dispatch(loadProductsStart());
  }
}
