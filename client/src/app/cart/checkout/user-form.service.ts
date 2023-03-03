import { Injectable, OnDestroy } from "@angular/core";
import { UntypedFormGroup, Validators, UntypedFormBuilder } from "@angular/forms";
import { select, Store } from "@ngrx/store";
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { IRootState } from "src/app/+store";
import { selectUser } from "src/app/+store/auth/selectors";
@Injectable()
export class UserFormService implements OnDestroy {
  private form = this.initForm();
  private userForm: BehaviorSubject<UntypedFormGroup> = new BehaviorSubject(this.form);
  userForm$: Observable<UntypedFormGroup> = this.userForm.asObservable();
  user$ = this.store.pipe(select(selectUser));
  formIsFulfilled: boolean = false;
  subscription!: Subscription;

  constructor(private fb: UntypedFormBuilder, private store: Store<IRootState>) {
    this.subscription = this.user$.subscribe(user => {
      if (user) {
        const { firstName, lastName, email, phoneNumber } = user;
        this.form.patchValue({ firstName, lastName, email, phoneNumber });
        this.setUserFormValue();
        this.formIsFulfilled = true;
      }
    });
  }

  get isFormFulfilled(): boolean {
    return this.formIsFulfilled;
  }

  initForm() {
    return this.fb.group({
      firstName: ["", [Validators.required, Validators.minLength(3)]],
      lastName: ["", [Validators.required, Validators.minLength(3)]],
      email: ["", [Validators.required, Validators.email]],
      phoneNumber: ["", [Validators.required, Validators.pattern(/^0[1-9]{1}[0-9]{8}$/)]],
    });
  }

  setUserFormValue() {
    this.userForm.next(this.form);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
