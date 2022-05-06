import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SnackBarComponent } from './snack-bar/snack-bar.component';
import { MaterialModule } from '../material/material.module';
import { FirstCapitalLetterPipe } from './pipes/first-capital-letter.pipe';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { StarRatingComponent } from './star-rating/star-rating.component';
import { DecimalFixedPipe } from './pipes/decimal-fixed.pipe';
import { NoProductsComponent } from './no-products/no-products.component';
import { AsideMenuComponent } from './aside-menu/aside-menu.component';
import { RouterModule } from '@angular/router';
import { ModalComponent } from './modal/modal.component';
import { SearchComponent } from './search/search.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SnackBarComponent,
    FirstCapitalLetterPipe,
    FileUploadComponent,
    LoadingSpinnerComponent,
    StarRatingComponent,
    DecimalFixedPipe,
    NoProductsComponent,
    AsideMenuComponent,
    ModalComponent,
    SearchComponent,
  ],
  imports: [CommonModule, MaterialModule, RouterModule, FormsModule],
  exports: [
    SnackBarComponent,
    FileUploadComponent,
    FirstCapitalLetterPipe,
    DecimalFixedPipe,
    LoadingSpinnerComponent,
    StarRatingComponent,
    NoProductsComponent,
    AsideMenuComponent,
    ModalComponent,
    SearchComponent,
  ],
})
export class SharedModule {}
