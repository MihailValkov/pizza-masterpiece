import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IFileImageUpload } from 'src/app/shared/interfaces/image-upload';
import { SnackBarComponent } from 'src/app/shared/snack-bar/snack-bar.component';
import { IAdminModuleState } from '../../+store';
import {
  createProductStart,
  loadProductStart,
} from '../../+store/products/actions';
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
    private snackBar: MatSnackBar,
    private store: Store<IAdminModuleState>
  ) {}

  ngOnInit() {
    this.subscription.add(
      this.productForm.form$.subscribe((form) => {
        this.form = form;
      })
    );
    this.subscription.add(
      this.errorMessage$.subscribe((message) => {
        message && this.showMessage(message, 'error');
      })
    );
    this.store.dispatch(loadProductStart({ id: 'test' }));
  }

  onFileUpload(imageFileData: IFileImageUpload) {
    this.imagePreview = imageFileData.file
      ? imageFileData.imageUrl
      : this.imagePreview;
    this.productForm.setFileImage(imageFileData.file);
  }

  submitHandler(): void {
    // if (this.form.invalid) {
    //   return;
    // }

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

  showMessage(message: string, status: 'error'): void {
    this.snackBar.openFromComponent(SnackBarComponent, {
      data: {
        message,
        status,
        action: 'Close',
      },
      duration: 3000,
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
