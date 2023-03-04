import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import {
  MatLegacyDialogRef as MatDialogRef,
  MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA,
} from "@angular/material/legacy-dialog";
import { select, Store } from "@ngrx/store";
import { IOrderModuleState } from "src/app/orders/+store";
import { clearOrderProduct, loadOrderProductStart } from "src/app/orders/+store/actions";
import { selectCurrentProduct, selectOrderIsLoading } from "src/app/orders/+store/selectors";

@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.css"],
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  currentProduct$ = this.store.pipe(select(selectCurrentProduct));
  isLoading$ = this.store.pipe(select(selectOrderIsLoading));

  constructor(
    public dialogRef: MatDialogRef<ProductDetailComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { _id: string; orderId: string },
    private store: Store<IOrderModuleState>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(loadOrderProductStart({ _id: this.data._id, orderId: this.data.orderId }));
  }

  ngOnDestroy(): void {
    this.store.dispatch(clearOrderProduct());
  }
}
