import { RouterModule, Routes } from '@angular/router';
import { MyCartComponent } from './my-cart/my-cart.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: MyCartComponent,
  },
  {
    path: 'checkout',
  },
];

export const CartRoutingModule = RouterModule.forChild(routes);
