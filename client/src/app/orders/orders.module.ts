import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { OrderTableComponent } from './orders-list/order-table/order-table.component';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { OrderRoutingModule } from './order-routing.module';
import { OrderService } from './order.service';
import { OrdersEffects } from './+store/effects';
import { reducers } from './+store';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { ProductsTableComponent } from './order-detail/products-table/products-table.component';

@NgModule({
  declarations: [OrdersListComponent, OrderTableComponent, OrderDetailComponent, ProductsTableComponent],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    OrderRoutingModule,
    StoreModule.forFeature('order', reducers),
    EffectsModule.forFeature([OrdersEffects]),
  ],
  providers: [OrderService],
})
export class OrdersModule {}
