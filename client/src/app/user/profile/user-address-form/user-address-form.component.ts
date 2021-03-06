import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IRootState } from 'src/app/+store';
import { updateUserAddressStart } from 'src/app/+store/auth/actions';
import {
  selectUpdateUserAddressIsLoading,
  selectUser,
} from 'src/app/+store/auth/selectors';

@Component({
  selector: 'app-user-address-form',
  templateUrl: './user-address-form.component.html',
  styleUrls: ['./user-address-form.component.css'],
})
export class UserAddressFormComponent implements OnInit {
  @Input() position: 'horizontal' | 'vertical' = 'horizontal';
  @Input() readOnly: boolean = false;

  user$ = this.store.pipe(select(selectUser));
  updateUserAddressIsLoading$ = this.store.pipe(
    select(selectUpdateUserAddressIsLoading)
  );
  addressForm!: FormGroup;
  subscription!: Subscription;

  constructor(private fb: FormBuilder, private store: Store<IRootState>) {}

  ngOnInit(): void {
    this.addressForm = this.fb.group({
      country: ['', [Validators.required, Validators.minLength(3)]],
      city: ['', [Validators.required, Validators.minLength(3)]],
      street: ['', [Validators.required, Validators.minLength(3)]],
      streetNumber: ['', [Validators.required, Validators.min(1)]],
    });
    
    this.subscription = this.user$.subscribe((user) => {
      if (user) {
        this.addressForm.setValue(user.address);
      }
    });
  }

  onSubmit() {
    if (this.addressForm.invalid) {
      return;
    }
    const { country, city, street, streetNumber } = this.addressForm.value;
    this.store.dispatch(
      updateUserAddressStart({
        country,
        city,
        street,
        streetNumber,
      })
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
