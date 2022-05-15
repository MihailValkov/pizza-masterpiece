import { Component, Input } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs';

import { IRootState } from 'src/app/+store';
import { logoutStart } from 'src/app/+store/auth/actions';
import {
  selectUserIsAdmin,
  selectUserIsLogged,
} from 'src/app/+store/auth/selectors';
import { IUserDataState } from '../+store';
import { selectTotalProducts } from '../+store/cart/selectors';
import { selectFavoritesList } from '../+store/favorites/selectors';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent {
  @Input() drawer!: MatDrawer;

  isLogged$ = this.store.pipe(select(selectUserIsLogged));
  isAdmin$ = this.store.pipe(select(selectUserIsAdmin));

  favoritesListCounter = this.store.pipe(
    select(selectFavoritesList),
    map((x) => x.length)
  );
  cartListCounter = this.store.pipe(select(selectTotalProducts));

  constructor(private store: Store<IRootState & IUserDataState>) {}

  logoutHandler(): void {
    this.store.dispatch(logoutStart());
  }
}
