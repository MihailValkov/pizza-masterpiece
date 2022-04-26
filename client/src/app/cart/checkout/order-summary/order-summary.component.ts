import { Component, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { combineLatest, map, Subscription } from 'rxjs';
import { IUserDataState } from 'src/app/core/+store';
import {
  selectTaxes,
  selectTotalPrice,
  selectTotalProducts,
} from 'src/app/core/+store/cart/selectors';
import { AddressFormService, IAddressForm } from '../address-form.service';
import { IUserForm, UserFormService } from '../user-form.service';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css'],
})
export class OrderSummaryComponent implements OnDestroy {
  cartTotalPrice$ = this.store.pipe(select(selectTotalPrice));
  cartTotalProducts$ = this.store.pipe(select(selectTotalProducts));
  cartTaxes$ = this.store.pipe(select(selectTaxes));
  userInfo!: IUserForm;
  addressInfo!: IAddressForm;
  subscription!: Subscription;

  constructor(
    private addressFormService: AddressFormService,
    private userFormService: UserFormService,
    private store: Store<IUserDataState>
  ) {
    this.subscription = combineLatest([
      this.addressFormService.addressForm$,
      this.userFormService.userForm$,
    ])
      .pipe(
        map(([addressForm, userForm]) => ({
          user: userForm.value as IUserForm,
          address: addressForm.value as IAddressForm,
        }))
      )
      .subscribe(({ user, address }) => {
        this.userInfo = user;
        this.addressInfo = address;
      });
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
