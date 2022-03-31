import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IFileImageUpload } from 'src/app/shared/interfaces/image-upload';

import { ProductFormService } from '../product-form.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
})
export class CreateProductComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  formSub!: Subscription;
  formData: FormData = new FormData();
  imagePreview: string =
    'data:image/png;base64,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';

  constructor(
    private productForm: ProductFormService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.formSub = this.productForm.form$.subscribe((form) => {
      this.form = form;
    });
  }

  onFileUpload(imageFileData: IFileImageUpload) {
    this.imagePreview = imageFileData.file
      ? imageFileData.imageUrl
      : this.imagePreview;
    this.productForm.setFileImage(imageFileData.file);
  }

  submitHandler(): void {
    Object.keys(this.form.value).map((key: string) => {
      const value = this.form.value[key];
      this.formData.append(
        key,
        Array.isArray(value) ? JSON.stringify(value) : value
      );
    });

    this.http
      .post('/admin/products', this.formData)
      .subscribe((x) => console.log(x));
    Object.keys(this.form.value).map((key: string) =>
      this.formData.delete(key)
    );
  }

  ngOnDestroy(): void {
    if (this.formSub) {
      this.formSub.unsubscribe();
    }
  }
}
