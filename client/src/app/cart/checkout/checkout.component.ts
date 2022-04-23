import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { combineLatest } from 'rxjs';
import { AddressFormService } from './address-form.service';
import { UserFormService } from './user-form.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent {
  addressForm$ = this.addressFormService.addressForm$;
  userForm$ = this.userFormService.userForm$;

  constructor(
    private addressFormService: AddressFormService,
    private userFormService: UserFormService
  ) {}
}
