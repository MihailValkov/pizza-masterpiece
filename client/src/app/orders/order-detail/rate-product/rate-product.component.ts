import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IOrderProductDetail } from 'src/app/shared/interfaces/order';

import { IOrderModuleState } from '../../+store';
import {
  clearOrderProduct,
  loadOrderProductStart,
  rateOrdererProductStart,
} from '../../+store/actions';
import {
  selectCurrentProduct,
  selectCurrentProductRates,
  selectOrderErrorMessage,
  selectOrderIsLoading,
} from '../../+store/selectors';
import { RateProductFormService } from './rate-product-form.service';
@Component({
  selector: 'app-rate-product',
  templateUrl: './rate-product.component.html',
  styleUrls: ['./rate-product.component.css'],
})
export class RateProductComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  subscription!: Subscription;
  currentProduct$ = this.store.pipe(select(selectCurrentProduct));
  isLoading$ = this.store.pipe(select(selectOrderIsLoading));
  errorMessage$ = this.store.pipe(select(selectOrderErrorMessage));

  constructor(
    public dialogRef: MatDialogRef<RateProductComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { orderId: string; _id: string; productId: string },
    private rateProductFormService: RateProductFormService,
    private store: Store<IOrderModuleState>
  ) {}

  ngOnInit(): void {
    this.subscription = this.rateProductFormService.rateForm$.subscribe(
      (form) => (this.form = form)
    );
    this.store.dispatch(
      loadOrderProductStart({ _id: this.data._id, orderId: this.data.orderId })
    );
  }

  onRateProduct() {
    if (this.form.invalid) {
      return;
    }
    const { rate, comment } = this.form.value;

    this.store.dispatch(
      rateOrdererProductStart({
        orderId: this.data.orderId,
        productId: this.data.productId,
        rate,
        comment,
      })
    );
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.store.dispatch(clearOrderProduct());
  }
}
