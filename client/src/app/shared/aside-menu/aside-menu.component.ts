import { Component, Input } from "@angular/core";
import { MatDrawer } from "@angular/material/sidenav";
import { select, Store } from "@ngrx/store";
import { IRootState } from "src/app/+store";
import { selectUserImage, selectUser } from "src/app/+store/auth/selectors";

@Component({
  selector: "app-aside-menu",
  templateUrl: "./aside-menu.component.html",
  styleUrls: ["./aside-menu.component.css"],
})
export class AsideMenuComponent {
  @Input() drawer!: MatDrawer;

  noAvatarImagePath = "../../../assets/images/anonymous-user-circle.png";
  userImage$ = this.store.pipe(select(selectUserImage));
  user$ = this.store.pipe(select(selectUser));

  constructor(private store: Store<IRootState>) {}

  onLinkClick() {
    this.drawer?.close();
  }
}
