import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartRoutingModule } from './cart-routing.module';
import { MyCartComponent } from './my-cart/my-cart.component';
import { MaterialModule } from '../material/material.module';
import { CartTableComponent } from './cart-table/cart-table.component';
import { SharedModule } from '../shared/shared.module';
import { CartInformationComponent } from './cart-information/cart-information.component';

@NgModule({
  declarations: [MyCartComponent, CartTableComponent, CartInformationComponent],
  imports: [CommonModule, SharedModule, MaterialModule, CartRoutingModule],
  providers: [],
})
export class CartModule {}
