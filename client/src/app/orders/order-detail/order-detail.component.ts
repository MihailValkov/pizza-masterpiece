import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { IOrderModuleState } from "../+store";
import { clearOrder, loadOrderStart } from "../+store/actions";
import { selectRatedProducts } from "src/app/+store/auth/selectors";
import { selectCurrentOrder, selectOrderIsLoading } from "../+store/selectors";
import { IRootState } from "src/app/+store";

@Component({
  selector: "app-order-detail",
  templateUrl: "./order-detail.component.html",
  styleUrls: ["./order-detail.component.css"],
})
export class OrderDetailComponent implements OnInit, OnDestroy {
  currentOrder$ = this.store.pipe(select(selectCurrentOrder));
  isLoading$ = this.store.pipe(select(selectOrderIsLoading));
  ratedProducts$ = this.store.pipe(select(selectRatedProducts));

  constructor(private store: Store<IOrderModuleState & IRootState>, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    const { orderId } = this.activatedRoute.snapshot.params;
    this.store.dispatch(loadOrderStart({ orderId }));
  }

  ngOnDestroy(): void {
    this.store.dispatch(clearOrder());
  }
}
