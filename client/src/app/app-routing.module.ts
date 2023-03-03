import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

import { AdminGuard } from "./core/guards/admin.guard";
import { AuthGuard } from "./core/guards/auth.guard";
import { NotFoundComponent } from "./core/not-found/not-found.component";
import { ProductDetailComponent } from "./products/product-detail/product-detail.component";
import { ProductsListComponent } from "./products/products-list/products-list.component";

const routes: Routes = [
  {
    path: "",
    canActivateChild: [AuthGuard],
    children: [
      {
        path: "",
        pathMatch: "full",
        component: ProductsListComponent,
      },
      {
        path: "detail/:id",
        component: ProductDetailComponent,
      },
      {
        path: "user",
        loadChildren: () => import("./user/user.module").then(m => m.UserModule),
      },
      {
        path: "cart",
        loadChildren: () => import("./cart/cart.module").then(m => m.CartModule),
      },
      {
        path: "favorites",
        loadChildren: () => import("./favorites/favorites.module").then(m => m.FavoritesModule),
      },
      {
        path: "orders",
        loadChildren: () => import("./orders/orders.module").then(m => m.OrdersModule),
        data: {
          isLogged: true,
        },
      },
      {
        path: "admin",
        canActivate: [AdminGuard],
        loadChildren: () => import("./admin/admin.module").then(m => m.AdminModule),
      },
      {
        path: "**",
        component: NotFoundComponent,
      },
    ],
  },
];

export const AppRoutingModule = RouterModule.forRoot(routes, {
  preloadingStrategy: PreloadAllModules,
});
