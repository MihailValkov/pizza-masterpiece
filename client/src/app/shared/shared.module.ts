import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SnackBarComponent } from './snack-bar/snack-bar.component';
import { MaterialModule } from '../material/material.module';
import { FirstCapitalLetterPipe } from './pipes/first-capital-letter.pipe';

@NgModule({
  declarations: [SnackBarComponent, FirstCapitalLetterPipe],
  imports: [CommonModule, MaterialModule],
  exports: [SnackBarComponent, FirstCapitalLetterPipe],
})
export class SharedModule {}
