import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { IRootState } from 'src/app/+store';
import { logoutStart } from 'src/app/+store/actions';
import { selectUser } from 'src/app/+store/selectors';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent {
  isLogged$ = this.store.pipe(select(selectUser));

  constructor(private store: Store<IRootState>) {}

  logoutHandler(): void {
    this.store.dispatch(logoutStart());
  }
}
