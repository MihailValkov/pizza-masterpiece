import { RouterModule, Routes } from '@angular/router';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrdersListComponent } from './orders-list/orders-list.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: OrdersListComponent,
  },
  {
    path: ':orderId',
    component: OrderDetailComponent,
  },
];

export const OrderRoutingModule = RouterModule.forChild(routes);
