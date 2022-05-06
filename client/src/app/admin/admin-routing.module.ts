import { RouterModule, Routes } from '@angular/router';
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
];

export const AdminRoutingModule = RouterModule.forChild(routes);
