import { Component, Input } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { IUserDataState } from "src/app/core/+store";
import { selectPrice, selectCartListCount, selectDeliveryPrice } from "src/app/core/+store/cart/selectors";

@Component({
  selector: "app-cart-information",
  templateUrl: "./cart-information.component.html",
  styleUrls: ["./cart-information.component.css"],
})
export class CartInformationComponent {
  @Input() canContinue: boolean = false;
  totalPrice$ = this.store.pipe(select(selectPrice));
  totalProducts$ = this.store.pipe(select(selectCartListCount));
  deliveryPrice$ = this.store.pipe(select(selectDeliveryPrice));

  constructor(private store: Store<IUserDataState>) {}
}
