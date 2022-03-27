import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class ProductFormService {
  private form: BehaviorSubject<FormGroup> = new BehaviorSubject(
    this.initForm()
  );
  form$: Observable<FormGroup> = this.form.asObservable();

  constructor(private fb: FormBuilder) {}

  initForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      imageUrl: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength]],
      sizes: this.fb.array([this.createControl('sizes')], Validators.required),
      doughs: this.fb.array(
        [this.createControl('doughs')],
        Validators.required
      ),
      ingredients: this.fb.array(
        [this.createControl('ingredients')],
        Validators.required
      ),
      extras: this.fb.array(
        [this.createControl('extras')],
        Validators.required
      ),
    });
  }
  getControl(type: 'sizes' | 'doughs' | 'extras' | 'ingredients'): FormArray {
    return this.form.getValue().get(type) as FormArray;
  }

  createControl(
    type: 'sizes' | 'doughs' | 'extras' | 'ingredients'
  ): FormGroup {
    if (type === 'sizes') {
      return this.fb.group({
        size: [null, [Validators.required, Validators.minLength(3)]],
        pieces: [null, [Validators.required, Validators.min(6)]],
        price: [null, [Validators.required, Validators.min(1)]],
      });
    } else if (type === 'doughs') {
      return this.fb.group({
        dough: [null, [Validators.required, Validators.minLength(3)]],
        price: [null, [Validators.required, Validators.min(0)]],
      });
    } else if (type === 'extras') {
      return this.fb.group({
        extra: [null, [Validators.required, Validators.minLength(3)]],
        price: [null, [Validators.required, Validators.min(0.5)]],
      });
    }
    return this.fb.group({
      ingredient: [null, [Validators.required, Validators.minLength(3)]],
    });
  }

  addControl(type: 'sizes' | 'doughs' | 'extras' | 'ingredients'): void {
    this.getControl(type).push(this.createControl(type));
    this.form.next(this.form.getValue());
  }

  removeControl(
    index: number,
    type: 'sizes' | 'doughs' | 'extras' | 'ingredients'
  ): void {
    this.getControl(type).removeAt(index);
    this.form.next(this.form.getValue());
  }
}
