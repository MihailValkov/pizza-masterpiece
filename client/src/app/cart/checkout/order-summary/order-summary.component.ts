import { Component, OnDestroy } from "@angular/core";
import { UntypedFormControl, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { select, Store } from "@ngrx/store";
import { combineLatest, map, startWith, Subscription } from "rxjs";
import { IUserDataState } from "src/app/core/+store";
import { completeCheckoutStart } from "src/app/core/+store/cart/actions";
import {
  selectDeliveryPrice,
  selectPrice,
  selectCartListCount,
  selectCartList,
} from "src/app/core/+store/cart/selectors";

import { IOrderCreate } from "src/app/shared/interfaces/order";
import { IUserAddress, IUserPersonalInfo } from "src/app/shared/interfaces/user";
import { AddressFormService } from "../address-form.service";
import { CheckoutCompleteComponent } from "../checkout-complete/checkout-complete.component";
import { UserFormService } from "../user-form.service";

@Component({
  selector: "app-order-summary",
  templateUrl: "./order-summary.component.html",
  styleUrls: ["./order-summary.component.css"],
})
export class OrderSummaryComponent implements OnDestroy {
  paymentMethodControl = new UntypedFormControl("", [Validators.required]);

  cartTotalProducts$ = this.store.pipe(select(selectCartListCount));
  cartPrice$ = this.store.pipe(select(selectPrice));
  cartDeliveryPrice$ = this.store.pipe(select(selectDeliveryPrice));
  products$ = this.transformProducts();
  subscription!: Subscription;
  orderInfo!: IOrderCreate;

  constructor(
    private addressFormService: AddressFormService,
    private userFormService: UserFormService,
    private store: Store<IUserDataState>,
    private dialog: MatDialog
  ) {
    this.subscription = this.getOrderData().subscribe(orderData => (this.orderInfo = orderData));
  }

  transformProducts() {
    return this.store.pipe(
      select(selectCartList),
      map(products =>
        products.map(p => {
          return {
            productId: p._id,
            selectedSize: { size: p.size.size, _id: p.size._id },
            selectedDough: { dough: p.dough.dough, _id: p.dough._id },
            selectedExtras: p.extras.map(e => ({
              extra: e.extra,
              _id: e._id,
            })),
            weight: p.weight,
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
      this.paymentMethodControl.valueChanges.pipe(startWith("")),
      this.addressFormService.addressForm$,
      this.userFormService.userForm$,
      this.cartTotalProducts$,
      this.cartPrice$,
      this.cartDeliveryPrice$,
      this.products$,
    ]).pipe(
      map(
        ([paymentMethod, addressForm, userForm, totalProducts, price, deliveryPrice, products]) =>
          (this.orderInfo = {
            user: {
              ...(userForm.value as IUserPersonalInfo),
              ...(addressForm.value as IUserAddress),
            },
            totalProducts,
            price,
            deliveryPrice,
            totalPrice: price + deliveryPrice,
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
