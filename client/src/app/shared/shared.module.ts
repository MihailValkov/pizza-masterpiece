import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SnackBarComponent } from './snack-bar/snack-bar.component';
import { MaterialModule } from '../material/material.module';
import { FirstCapitalLetterPipe } from './pipes/first-capital-letter.pipe';
import { FileUploadComponent } from './file-upload/file-upload.component';

@NgModule({
  declarations: [
    SnackBarComponent,
    FirstCapitalLetterPipe,
    FileUploadComponent,
  ],
  imports: [CommonModule, MaterialModule],
  exports: [SnackBarComponent, FileUploadComponent, FirstCapitalLetterPipe],
})
export class SharedModule {}
