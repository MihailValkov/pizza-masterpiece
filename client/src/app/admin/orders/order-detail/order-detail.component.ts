import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IAdminModuleState } from '../../+store';
import { selectAdminCurrentOrder, selectAdminCurrentOrderIsLoading } from '../../+store/orders/selectors';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  currentOrder$ = this.store.pipe(select(selectAdminCurrentOrder))
  currentOrderIsLoading$ = this.store.pipe(select(selectAdminCurrentOrderIsLoading))

  constructor(private store:Store<IAdminModuleState>) { }

  ngOnInit(): void {
  }

}
