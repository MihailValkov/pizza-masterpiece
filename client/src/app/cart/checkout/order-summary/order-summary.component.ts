import { Component, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { combineLatest, map, startWith, Subscription } from 'rxjs';
import { IUserDataState } from 'src/app/core/+store';
import { completeCheckoutStart } from 'src/app/core/+store/cart/actions';
import {
  selectTaxes,
  selectPrice,
  selectTotalProducts,
  selectCartList,
  selectCheckoutIsLoading,
  selectCheckoutErrorMessage,
} from 'src/app/core/+store/cart/selectors';

import { IOrder } from 'src/app/shared/interfaces/order';
import { AddressFormService, IAddressForm } from '../address-form.service';
import { CheckoutCompleteComponent } from '../checkout-complete/checkout-complete.component';
import { IUserForm, UserFormService } from '../user-form.service';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css'],
})
export class OrderSummaryComponent implements OnDestroy {
  paymentMethodControl = new FormControl('', [Validators.required]);

  cartTotalProducts$ = this.store.pipe(select(selectTotalProducts));
  cartPrice$ = this.store.pipe(select(selectPrice));
  cartTaxes$ = this.store.pipe(select(selectTaxes));
  products$ = this.transformProducts();
  subscription!: Subscription;
  orderInfo!: IOrder;

  constructor(
    private addressFormService: AddressFormService,
    private userFormService: UserFormService,
    private store: Store<IUserDataState>,
    private dialog: MatDialog
  ) {
    this.subscription = this.getOrderData().subscribe(
      (orderData) => (this.orderInfo = orderData)
    );
  }

  transformProducts() {
    return this.store.pipe(
      select(selectCartList),
      map((products) =>
        products.map((p) => {
          return {
            productId: p._id,
            selectedSize: { size: p.size.size, _id: p.size._id },
            selectedDough: { dough: p.dough.dough, _id: p.dough._id },
            selectedExtras: p.extras.map((e) => ({
              extra: e.extra,
              _id: e._id,
            })),
            gr: p.gr,
            quantity: p.quantity,
            price: p.price,
            totalPrice: p.totalPrice,
          };
        })
      )
    );
  }

  getOrderData() {
    return combineLatest([
      this.paymentMethodControl.valueChanges.pipe(startWith('')),
      this.addressFormService.addressForm$,
      this.userFormService.userForm$,
      this.cartTotalProducts$,
      this.cartPrice$,
      this.cartTaxes$,
      this.products$,
    ]).pipe(
      map(
        ([
          paymentMethod,
          addressForm,
          userForm,
          totalProducts,
          price,
          taxes,
          products,
        ]) =>
          (this.orderInfo = {
            user: {
              ...(userForm.value as IUserForm),
              ...(addressForm.value as IAddressForm),
            },
            totalProducts,
            price,
            taxes,
            totalPrice: price + taxes,
            products,
            paymentMethod,
          })
      )
    );
  }

  completeOrder() {
    if (this.paymentMethodControl.invalid) {
      return;
    }
    this.openDialog();
    this.store.dispatch(completeCheckoutStart({ order: this.orderInfo }));
  }

  openDialog() {
    this.dialog.open(CheckoutCompleteComponent, {
      disableClose: true,
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
