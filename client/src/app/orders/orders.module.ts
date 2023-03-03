import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { OrdersListComponent } from "./orders-list/orders-list.component";
import { OrderTableComponent } from "./orders-list/orders-table/orders-table.component";
import { MaterialModule } from "../material/material.module";
import { SharedModule } from "../shared/shared.module";
import { OrderRoutingModule } from "./order-routing.module";
import { OrderService } from "./order.service";
import { OrdersEffects } from "./+store/effects";
import { reducers } from "./+store";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { OrderDetailComponent } from "./order-detail/order-detail.component";
import { ProductsTableComponent } from "./order-detail/products-table/products-table.component";
import { ReactiveFormsModule } from "@angular/forms";
import { DiagramItemComponent } from "./order-detail/rate-product/rating-diagram/diagram-item/diagram-item.component";
import { RateComponent } from "./order-detail/rate-product/rate/rate.component";
import { ReviewFormComponent } from "./order-detail/rate-product/review-form/review-form.component";
import { RateProductFormService } from "./order-detail/rate-product/rate-product-form.service";
import { RateProductComponent } from "./order-detail/rate-product/rate-product.component";
import { RatingDiagramComponent } from "./order-detail/rate-product/rating-diagram/rating-diagram.component";
import { ProductDetailComponent } from "./order-detail/products-table/product-detail/product-detail.component";

@NgModule({
  declarations: [
    OrdersListComponent,
    OrderTableComponent,
    OrderDetailComponent,
    ProductsTableComponent,
    RateProductComponent,
    RatingDiagramComponent,
    DiagramItemComponent,
    RateComponent,
    ReviewFormComponent,
    ProductDetailComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    OrderRoutingModule,
    StoreModule.forFeature("order", reducers),
    EffectsModule.forFeature([OrdersEffects]),
  ],
  providers: [OrderService, RateProductFormService],
})
export class OrdersModule {}
