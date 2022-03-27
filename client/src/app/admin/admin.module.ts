import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateProductComponent } from './products/create-product/create-product.component';
import { AdminRoutingModule } from './admin-routing.module';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductFormService } from './products/product-form.service';
import { ExpansionPanelComponent } from './products/expansion-panel/expansion-panel.component';

@NgModule({
  declarations: [CreateProductComponent, ExpansionPanelComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    AdminRoutingModule,
  ],
  providers: [ProductFormService],
})
export class AdminModule {}
