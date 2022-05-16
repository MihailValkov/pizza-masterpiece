import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { IAdminModuleState } from 'src/app/admin/+store';
import { changeOrderStatusStart } from 'src/app/admin/+store/orders/actions';
import { selectAdminCurrentOrderIsLoading } from 'src/app/admin/+store/orders/selectors';
import { IOrderStatus } from 'src/app/shared/interfaces/admin';

@Component({
  selector: 'app-order-status-form',
  templateUrl: './order-status-form.component.html',
  styleUrls: ['./order-status-form.component.css'],
})
export class OrderStatusFormComponent implements OnInit {
  @Input() orderId!: string;
  @Input() currentStatus!: IOrderStatus;
  @Input() orderStatuses!: IOrderStatus[];
  currentOrderIsLoading$ = this.store.pipe(
    select(selectAdminCurrentOrderIsLoading)
  );

  constructor(private store: Store<IAdminModuleState>) {}

  ngOnInit(): void {}

  submitHandler(form: NgForm) {
    if (form.invalid || !this.orderId) {
      return;
    }
    const { status } = form.value;

    this.store.dispatch(
      changeOrderStatusStart({ orderId: this.orderId, status })
    );
  }
}
