import { RouterModule, Routes } from '@angular/router';
import { CreateProductComponent } from './create-product/create-product.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
  },
  {
    path: 'create',
    component: CreateProductComponent,
  },
];

export const AdminRoutingModule = RouterModule.forChild(routes);
