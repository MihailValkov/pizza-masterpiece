import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IOrderModuleState } from '../+store';
import { selectOrders, selectOrdersCount } from '../+store/selectors';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css'],
})
export class OrdersListComponent implements OnInit {
  orders$ = this.store.pipe(select(selectOrders));
  ordersCount$ = this.store.pipe(select(selectOrdersCount));

  constructor(private store: Store<IOrderModuleState>) {}

  ngOnInit(): void {}
}
