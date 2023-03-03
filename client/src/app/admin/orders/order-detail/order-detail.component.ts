import { Component } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { IAdminModuleState } from "../../+store";
import {
  selectAdminCurrentOrder,
  selectAdminCurrentOrderIsLoading,
  selectAdminOrdersStatuses,
} from "../../+store/orders/selectors";

@Component({
  selector: "app-order-detail",
  templateUrl: "./order-detail.component.html",
  styleUrls: ["./order-detail.component.css"],
})
export class OrderDetailComponent {
  currentOrder$ = this.store.pipe(select(selectAdminCurrentOrder));
  currentOrderIsLoading$ = this.store.pipe(select(selectAdminCurrentOrderIsLoading));
  ordersStatuses$ = this.store.pipe(select(selectAdminOrdersStatuses));

  constructor(private store: Store<IAdminModuleState>) {}
}
