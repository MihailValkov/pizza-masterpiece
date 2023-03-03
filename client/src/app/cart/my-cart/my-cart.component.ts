import { Component } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { IUserDataState } from "src/app/core/+store";
import { selectCartList } from "src/app/core/+store/cart/selectors";

@Component({
  selector: "app-my-cart",
  templateUrl: "./my-cart.component.html",
  styleUrls: ["./my-cart.component.css"],
})
export class MyCartComponent {
  products$ = this.store.pipe(select(selectCartList));

  constructor(private store: Store<IUserDataState>) {}
}
