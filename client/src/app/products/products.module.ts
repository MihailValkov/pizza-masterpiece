import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductItemComponent } from './product-item/product-item.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { MaterialModule } from '../material/material.module';
import { ProductRoutingModule } from './product-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ProductService } from './product.service';
import { StoreModule } from '@ngrx/store';
import { reducers } from './+store';
import { EffectsModule } from '@ngrx/effects';
import { ProductsEffects } from './+store/effects';

@NgModule({
  declarations: [
    ProductItemComponent,
    ProductsListComponent,
    ProductDetailComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ProductRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    StoreModule.forFeature('product', reducers),
    EffectsModule.forFeature([ProductsEffects]),
  ],
  providers: [ProductService],
})
export class ProductsModule {}
