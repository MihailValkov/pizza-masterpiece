import { Component, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs';

import { IOrderModuleState } from '../../+store';
import { rateOrdererProductStart } from '../../+store/actions';
import {
  selectCurrentOrderProducts,
  selectOrderErrorMessage,
  selectOrderIsLoading,
} from '../../+store/selectors';
import { RateProductFormService } from './rate-product-form.service';

export interface DialogData {
  orderId: string;
  productId: string;
  productName: string;
  imageUrl: string;
}

@Component({
  selector: 'app-rate-product',
  templateUrl: './rate-product.component.html',
  styleUrls: ['./rate-product.component.css'],
})
export class RateProductComponent {
  form!: FormGroup;

  currentProductRates$ = this.store.pipe(
    select(selectCurrentOrderProducts),
    map((products) => products.find((p) => p._id == this.data.productId)),
    map((p) => p!.rates)
  );
  isLoading$ = this.store.pipe(select(selectOrderIsLoading));
  errorMessage$ = this.store.pipe(select(selectOrderErrorMessage));

  constructor(
    public dialogRef: MatDialogRef<RateProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private rateProductFormService: RateProductFormService,
    private store: Store<IOrderModuleState>
  ) {
    this.rateProductFormService.rateForm$.subscribe(
      (form) => (this.form = form)
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
}
