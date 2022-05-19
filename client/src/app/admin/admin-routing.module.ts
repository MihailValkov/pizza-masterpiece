import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './orders/orders.component';
import { CreateProductComponent } from './products/create-product/create-product.component';
import { ProductsComponent } from './products/products/products.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path: 'users',
    component: UsersComponent,
  },
  {
    path: 'orders',
    component: OrdersComponent,
  },
  {
    path: 'products',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: ProductsComponent,
      },
      {
        path: 'create',
        component: CreateProductComponent,
      },
    ],
  },
];

export const AdminRoutingModule = RouterModule.forChild(routes);
