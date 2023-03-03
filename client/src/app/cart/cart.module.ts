import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CartRoutingModule } from "./cart-routing.module";
import { MyCartComponent } from "./my-cart/my-cart.component";
import { MaterialModule } from "../material/material.module";
import { CartTableComponent } from "./cart-table/cart-table.component";
import { SharedModule } from "../shared/shared.module";
import { CartInformationComponent } from "./cart-information/cart-information.component";
import { CheckoutComponent } from "./checkout/checkout.component";
import { ReactiveFormsModule } from "@angular/forms";
import { AddressFormComponent } from "./checkout/address-form/address-form.component";
import { UserFormComponent } from "./checkout/user-form/user-form.component";
import { OrderSummaryComponent } from "./checkout/order-summary/order-summary.component";
import { AddressFormService } from "./checkout/address-form.service";
import { UserFormService } from "./checkout/user-form.service";
import { CheckoutCompleteComponent } from "./checkout/checkout-complete/checkout-complete.component";
import { CartProductDetailComponent } from "./cart-table/cart-product-detail/cart-product-detail.component";

@NgModule({
  declarations: [
    MyCartComponent,
    CartTableComponent,
    CartInformationComponent,
    CheckoutComponent,
    AddressFormComponent,
    UserFormComponent,
    OrderSummaryComponent,
    CheckoutCompleteComponent,
    CartProductDetailComponent,
  ],
  imports: [CommonModule, SharedModule, MaterialModule, CartRoutingModule, ReactiveFormsModule],
  providers: [AddressFormService, UserFormService],
})
export class CartModule {}
