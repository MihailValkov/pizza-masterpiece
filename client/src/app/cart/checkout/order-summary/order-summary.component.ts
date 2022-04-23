import { Component, OnDestroy } from '@angular/core';
import { combineLatest, map, Subscription } from 'rxjs';
import { AddressFormService, IAddressForm } from '../address-form.service';
import { IUserForm, UserFormService } from '../user-form.service';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css'],
})
export class OrderSummaryComponent implements OnDestroy {
  userInfo!: IUserForm;
  addressInfo!: IAddressForm;
  subscription!: Subscription;

  constructor(
    private addressFormService: AddressFormService,
    private userFormService: UserFormService
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
