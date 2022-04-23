import { Component } from '@angular/core';
import { AddressFormService } from '../address-form.service';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.css'],
})
export class AddressFormComponent {
  addressForm$ = this.addressFormService.addressForm$;

  constructor(private addressFormService: AddressFormService) {}

  setFormValue() {
    this.addressFormService.setAddressFormValue();
  }
}
