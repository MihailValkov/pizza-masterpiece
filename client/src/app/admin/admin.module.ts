import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateProductComponent } from './create-product/create-product.component';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  declarations: [CreateProductComponent],
  imports: [CommonModule, AdminRoutingModule],
})
export class AdminModule {}
