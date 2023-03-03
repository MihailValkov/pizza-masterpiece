import { RouterModule, Routes } from "@angular/router";
import { CheckoutComponent } from "./checkout/checkout.component";
import { MyCartComponent } from "./my-cart/my-cart.component";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: MyCartComponent,
  },
  {
    path: "checkout",
    component: CheckoutComponent,
  },
];

export const CartRoutingModule = RouterModule.forChild(routes);
