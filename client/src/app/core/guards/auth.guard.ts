import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

import { first, map, Observable, tap } from 'rxjs';
import { select, Store } from '@ngrx/store';

import { IRootState } from 'src/app/+store';
import { selectUser } from 'src/app/+store/selectors';
import { authenticateStart } from 'src/app/+store/actions';

@Injectable()
export class AuthGuard implements CanActivateChild {
  user$ = this.store.pipe(select(selectUser));
  constructor(private store: Store<IRootState>, private router: Router) {}

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> {
    return this.user$.pipe(
      map((user) =>
        user === undefined ? this.store.dispatch(authenticateStart()) : user
      ),
      map(
        (user) =>
          typeof childRoute.data?.['isLogged'] !== 'boolean' ||
          childRoute.data?.['isLogged'] === !!user
      ),
      tap((canContinue) => {
        if (canContinue) {
          return;
        }
        this.router.navigateByUrl('/');
      }),
      first()
    );
  }
}
