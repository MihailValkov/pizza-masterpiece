import { Component } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { IUserDataState } from "src/app/core/+store";
import { selectFavoritesList } from "src/app/core/+store/favorites/selectors";

@Component({
  selector: "app-favorites",
  templateUrl: "./my-favorites.component.html",
  styleUrls: ["./my-favorites.component.css"],
})
export class FavoritesComponent {
  products$ = this.store.pipe(select(selectFavoritesList));

  constructor(private store: Store<IUserDataState>) {}
}
