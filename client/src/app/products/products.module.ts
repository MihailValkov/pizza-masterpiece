import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductItemComponent } from './product-item/product-item.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    ProductItemComponent,
    ProductsListComponent,
    ProductDetailComponent,
  ],
  imports: [CommonModule, MaterialModule],
})
export class ProductsModule {}
