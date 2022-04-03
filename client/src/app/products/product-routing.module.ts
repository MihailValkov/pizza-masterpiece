import { RouterModule, Routes } from '@angular/router';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductsListComponent } from './products-list/products-list.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsListComponent,
    pathMatch: 'full',
  },
  {
    path: 'detail/:id',
    component: ProductDetailComponent,
  },
];

export const ProductRoutingModule = RouterModule.forChild(routes);
