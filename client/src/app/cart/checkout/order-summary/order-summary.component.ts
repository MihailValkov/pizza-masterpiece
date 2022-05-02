import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import {
  combineLatest,
  filter,
  first,
  last,
  map,
  Observable,
  startWith,
  Subscription,
  tap,
} from 'rxjs';
import { IUserDataState } from 'src/app/core/+store';
import {
  selectTaxes,
  selectPrice,
  selectTotalProducts,
  selectCartList,
} from 'src/app/core/+store/cart/selectors';
import { IOrder } from 'src/app/shared/interfaces/order';
import { AddressFormService, IAddressForm } from '../address-form.service';
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
    private http: HttpClient
  ) {
    this.subscription = this.getOrderData().subscribe(
      (orderData) => (this.orderInfo = orderData)
    );

    this.http.get('/orders').subscribe({
      next: (x) => console.log(x),
      error: (error) => console.log(error),
    });
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
            products,
            paymentMethod,
          })
      )
    );
  }

  completeOrder() {
    if (this.paymentMethodControl.valid) {
      // console.log(this.orderInfo);
      this.http.post('/orders', this.orderInfo).subscribe({
        next: (x) => console.log(x),
        error: (error) => console.log(error),
      });
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
