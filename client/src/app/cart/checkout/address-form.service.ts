import { Injectable } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';

export interface IAddressForm {
  country: string;
  city: string;
  street: string;
  streetNumber: number;
}

@Injectable()
export class AddressFormService {
  private addressForm: BehaviorSubject<FormGroup> = new BehaviorSubject(
    this.initForm()
  );
  addressForm$: Observable<FormGroup> = this.addressForm.asObservable();

  constructor(private fb: FormBuilder) {}

  initForm() {
    return this.fb.group({
      country: ['', [Validators.required, Validators.minLength(3)]],
      city: ['', [Validators.required, Validators.minLength(3)]],
      street: ['', [Validators.required, Validators.minLength(3)]],
      streetNumber: ['', [Validators.required, Validators.min(1)]],
    });
  }

  setAddressFormValue() {
    this.addressForm.next(this.addressForm.getValue());
  }
}
