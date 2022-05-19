import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IFileImageUpload } from 'src/app/shared/interfaces/image-upload';
import { IAdminModuleState } from '../../+store';
import { createProductStart } from '../../+store/products/actions';
import {
  selectAdminProductsErrorMessage,
  selectAdminProductsIsLoading,
} from '../../+store/products/selectors';

import { ProductFormService } from '../product-form.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
})
export class CreateProductComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  subscription: Subscription = new Subscription();
  imagePreview = '../../../../assets/images/no-image.png';
  isLoading$ = this.store.pipe(select(selectAdminProductsIsLoading));
  errorMessage$ = this.store.pipe(select(selectAdminProductsErrorMessage));

  constructor(
    private productForm: ProductFormService,
    private store: Store<IAdminModuleState>
  ) {}

  ngOnInit() {
    this.subscription.add(
      this.productForm.form$.subscribe((form) => {
        this.form = form;
      })
    );
  }

  onFileUpload(imageFileData: IFileImageUpload) {
    this.imagePreview = imageFileData.file
      ? imageFileData.imageUrl
      : this.imagePreview;
    this.productForm.setFileImage(imageFileData.file);
  }

  submitHandler(): void {
    if (this.form.invalid) {
      return;
    }

    const productFormData = this.createNewFormData();

    this.store.dispatch(createProductStart({ productFormData }));
  }

  createNewFormData(): FormData {
    const formData = new FormData();
    Object.keys(this.form.value).map((key: string) => {
      const value = this.form.value[key];
      formData.append(
        key,
        Array.isArray(value) ? JSON.stringify(value) : value
      );
    });
    return formData;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
