import { Component, Input } from "@angular/core";
import { AddressFormService } from "../address-form.service";

@Component({
  selector: "app-address-form",
  templateUrl: "./address-form.component.html",
  styleUrls: ["./address-form.component.css"],
})
export class AddressFormComponent {
  @Input() hideActions: boolean = false;
  addressForm$ = this.addressFormService.addressForm$;
  isFormFulfilled = this.addressFormService.formIsFulfilled;

  constructor(private addressFormService: AddressFormService) {}

  setFormValue() {
    this.addressFormService.setAddressFormValue();
  }
}
