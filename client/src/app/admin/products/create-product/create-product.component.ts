import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

import { ProductFormService } from '../product-form.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
})
export class CreateProductComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  formSub!: Subscription;

  constructor(private productForm: ProductFormService) {}

  ngOnInit() {
    this.formSub = this.productForm.form$.subscribe((form) => {
      this.form = form;
    });
  }

  uploadFile(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    const file: File | null = element.files && element.files[0];
    const formData = new FormData();
    if (!file?.type.includes('image')) {
      return this.form.get('imageUrl')?.setErrors({ type: true });
    }
    if (file) {
      formData.append('image', file);
      // this.http
      //   .post('/uploads/products', formData)
      //   .subscribe((x) => console.log(x));
    }
  }
  uploadHandler(inputRef: HTMLInputElement) {
    inputRef.click();
  }

  submitHandler(): void {
    console.log(this.form);
  }

  ngOnDestroy(): void {
    if (this.formSub) {
      this.formSub.unsubscribe();
    }
  }
}
