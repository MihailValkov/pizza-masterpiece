import { RouterModule, Routes } from '@angular/router';
import { ProductsListComponent } from './products-list/products-list.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsListComponent,
  },
];

export const ProductRoutingModule = RouterModule.forChild(routes);
