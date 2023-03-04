import { Component, Input } from "@angular/core";
import { MatDrawer } from "@angular/material/sidenav";
import { select, Store } from "@ngrx/store";

import { IRootState } from "src/app/+store";
import { logoutStart } from "src/app/+store/auth/actions";
import { selectUserIsAdmin, selectUserIsLogged } from "src/app/+store/auth/selectors";
import { IUserDataState } from "../+store";
import { selectCartListCount } from "../+store/cart/selectors";
import { selectFavoritesListCount } from "../+store/favorites/selectors";

@Component({
  selector: "app-navigation",
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.css"],
})
export class NavigationComponent {
  @Input() drawer!: MatDrawer;

  isLogged$ = this.store.pipe(select(selectUserIsLogged));
  isAdmin$ = this.store.pipe(select(selectUserIsAdmin));
  favoritesListCounter$ = this.store.pipe(select(selectFavoritesListCount));
  cartListCounter$ = this.store.pipe(select(selectCartListCount));

  constructor(private store: Store<IRootState & IUserDataState>) {}

  logoutHandler(): void {
    this.store.dispatch(logoutStart());
  }
}
