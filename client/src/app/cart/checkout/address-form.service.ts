import { Injectable, OnDestroy } from "@angular/core";
import { UntypedFormGroup, Validators, UntypedFormBuilder } from "@angular/forms";
import { select, Store } from "@ngrx/store";
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { IRootState } from "src/app/+store";
import { selectUser } from "src/app/+store/auth/selectors";

@Injectable()
export class AddressFormService implements OnDestroy {
  private form = this.initForm();
  private addressForm: BehaviorSubject<UntypedFormGroup> = new BehaviorSubject(this.form);
  addressForm$: Observable<UntypedFormGroup> = this.addressForm.asObservable();
  user$ = this.store.pipe(select(selectUser));
  formIsFulfilled: boolean = false;
  subscription!: Subscription;

  constructor(private fb: UntypedFormBuilder, private store: Store<IRootState>) {
    this.subscription = this.user$.subscribe(user => {
      if (user?.address) {
        const { country, city, street, streetNumber } = user.address;
        this.form.patchValue({ country, city, street, streetNumber });
        this.setAddressFormValue();
        this.formIsFulfilled = true;
      }
    });
  }

  get isFormFulfilled(): boolean {
    return this.formIsFulfilled;
  }

  initForm() {
    return this.fb.group({
      country: ["", [Validators.required, Validators.minLength(3)]],
      city: ["", [Validators.required, Validators.minLength(3)]],
      street: ["", [Validators.required, Validators.minLength(3)]],
      streetNumber: ["", [Validators.required, Validators.min(1)]],
    });
  }

  setAddressFormValue() {
    this.addressForm.next(this.form);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
