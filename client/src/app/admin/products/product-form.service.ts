import { Injectable } from "@angular/core";
import { UntypedFormGroup, UntypedFormBuilder, Validators, UntypedFormArray } from "@angular/forms";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable()
export class ProductFormService {
  private form: BehaviorSubject<UntypedFormGroup> = new BehaviorSubject(this.initForm());
  form$: Observable<UntypedFormGroup> = this.form.asObservable();

  constructor(private fb: UntypedFormBuilder) {}

  initForm(): UntypedFormGroup {
    return this.fb.group({
      name: ["", [Validators.required, Validators.minLength(3)]],
      image: [null, [Validators.required]],
      description: ["", [Validators.required, Validators.minLength(10)]],
      sizes: this.fb.array([this.createControl("sizes")], Validators.required),
      doughs: this.fb.array([this.createControl("doughs")], Validators.required),
      ingredients: this.fb.array([this.createControl("ingredients")], Validators.required),
      extras: this.fb.array([this.createControl("extras")], Validators.required),
    });
  }
  getControl(type: "sizes" | "doughs" | "extras" | "ingredients"): UntypedFormArray {
    return this.form.getValue().get(type) as UntypedFormArray;
  }

  createControl(type: "sizes" | "doughs" | "extras" | "ingredients"): UntypedFormGroup {
    if (type === "sizes") {
      return this.fb.group({
        size: ["", [Validators.required, Validators.minLength(3)]],
        pieces: ["", [Validators.required, Validators.min(6)]],
        price: ["", [Validators.required, Validators.min(1)]],
      });
    } else if (type === "doughs") {
      return this.fb.group({
        dough: ["", [Validators.required, Validators.minLength(3)]],
        price: ["", [Validators.required, Validators.min(0)]],
      });
    } else if (type === "extras") {
      return this.fb.group({
        extra: ["", [Validators.required, Validators.minLength(3)]],
        price: ["", [Validators.required, Validators.min(0.5)]],
      });
    }
    return this.fb.group({
      ingredient: ["", [Validators.required, Validators.minLength(3)]],
    });
  }

  addControl(type: "sizes" | "doughs" | "extras" | "ingredients"): void {
    this.getControl(type).push(this.createControl(type));
    this.form.next(this.form.getValue());
  }

  removeControl(index: number, type: "sizes" | "doughs" | "extras" | "ingredients"): void {
    this.getControl(type).removeAt(index);
    this.form.next(this.form.getValue());
  }

  setFileImage(file: File) {
    this.form.getValue().patchValue({ image: file }, { onlySelf: true });
    this.form.next(this.form.getValue());
  }
}
