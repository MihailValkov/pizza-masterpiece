import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './orders/orders.component';
import { CreateProductComponent } from './products/create-product/create-product.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
  },
  {
    path: 'products/create',
    component: CreateProductComponent,
  },
  {
    path: 'users',
    component: UsersComponent,
  },
  {
    path: 'orders',
    component: OrdersComponent,
  },
];

export const AdminRoutingModule = RouterModule.forChild(routes);
