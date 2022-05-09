import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTreeModule } from '@angular/material/tree';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatBadgeModule } from '@angular/material/badge';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSortModule } from '@angular/material/sort';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

const modules = [
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatButtonModule,
  MatCardModule,
  MatListModule,
  MatToolbarModule,
  MatProgressBarModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatSelectModule,
  MatChipsModule,
  MatAutocompleteModule,
  MatDividerModule,
  MatExpansionModule,
  MatTreeModule,
  MatCheckboxModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatTableModule,
  MatPaginatorModule,
  MatBadgeModule,
  MatStepperModule,
  MatSortModule,
  MatTabsModule,
  MatDialogModule,
  MatButtonToggleModule,
];

@NgModule({
  exports: [modules],
})
export class MaterialModule {}
