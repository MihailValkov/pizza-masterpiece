import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs';

import { IRootState } from 'src/app/+store';
import { logoutStart } from 'src/app/+store/actions';
import { selectUser } from 'src/app/+store/selectors';
import { IUserDataState } from '../+store';
import { selectCartList } from '../+store/cart/selectors';
import { selectFavoritesList } from '../+store/favorites/selectors';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent {
  isLogged$ = this.store.pipe(select(selectUser));
  favoritesListCounter = this.store.pipe(
    select(selectFavoritesList),
    map((x) => x.length)
  );
  cartListCounter = this.store.pipe(
    select(selectCartList),
    map((x) => x.length)
  );

  constructor(private store: Store<IRootState & IUserDataState>) {}

  logoutHandler(): void {
    this.store.dispatch(logoutStart());
  }
}
