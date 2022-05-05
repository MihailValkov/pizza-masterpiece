import { RouterModule, Routes } from '@angular/router';
import { CreateProductComponent } from './products/create-product/create-product.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
  },
  {
    path: 'products/create',
    component: CreateProductComponent,
  },
];

export const AdminRoutingModule = RouterModule.forChild(routes);
