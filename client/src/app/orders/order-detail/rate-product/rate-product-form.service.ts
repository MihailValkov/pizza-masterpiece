import { Injectable } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable()
export class RateProductFormService {
  private form = this.initForm();
  private rateForm: BehaviorSubject<UntypedFormGroup> = new BehaviorSubject(this.form);
  rateForm$: Observable<UntypedFormGroup> = this.rateForm.asObservable();
  constructor(private fb: UntypedFormBuilder) {}

  initForm(): UntypedFormGroup {
    return this.fb.group({
      rate: [null, [Validators.required]],
      comment: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(500)]],
    });
  }

  setRating(rate: number) {
    this.rateForm.getValue().patchValue({ rate });
    this.rateForm.next(this.rateForm.getValue());
  }

  setComment(comment: number) {
    this.rateForm.getValue().patchValue({ comment });
    this.rateForm.next(this.rateForm.getValue());
  }
}
