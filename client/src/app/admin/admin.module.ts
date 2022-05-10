import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateProductComponent } from './products/create-product/create-product.component';
import { AdminRoutingModule } from './admin-routing.module';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductFormService } from './products/product-form.service';
import { ExpansionPanelComponent } from './products/expansion-panel/expansion-panel.component';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { AdminEffects, reducers } from './+store';
import { AdminService } from './admin.service';
import { EffectsModule } from '@ngrx/effects';
import { UsersComponent } from './users/users.component';
import { UsersTableComponent } from './users/users-table/users-table.component';
import { UserTableDetailComponent } from './users/users-table/user-table-detail/user-table-detail.component';
import { OrdersComponent } from './orders/orders.component';
import { OrdersTableComponent } from './orders/orders-table/orders-table.component';

@NgModule({
  declarations: [
    CreateProductComponent,
    ExpansionPanelComponent,
    UsersComponent,
    UsersTableComponent,
    UserTableDetailComponent,
    OrdersComponent,
    OrdersTableComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    AdminRoutingModule,
    SharedModule,
    StoreModule.forFeature('admin', reducers),
    EffectsModule.forFeature(AdminEffects),
  ],
  providers: [ProductFormService, AdminService],
})
export class AdminModule {}
