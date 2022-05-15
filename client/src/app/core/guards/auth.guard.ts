import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

import { filter, last, map, Observable, take, tap } from 'rxjs';
import { select, Store } from '@ngrx/store';

import { IRootState } from 'src/app/+store';
import { selectUser } from 'src/app/+store/auth/selectors';
import { authenticateStart } from 'src/app/+store/auth/actions';

import { IUser } from 'src/app/shared/interfaces/user';

@Injectable()
export class AuthGuard implements CanActivateChild {
  user$ = this.store.pipe(select(selectUser));
  constructor(private store: Store<IRootState>, private router: Router) {}

  getFromStoreOrAPI(): Observable<IUser | null | undefined | void> {
    return this.user$.pipe(
      map((user) =>
        user === undefined ? this.store.dispatch(authenticateStart()) : user
      ),
      filter((user: undefined | null | IUser | void) => user !== undefined),
      take(1)
    );
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.getFromStoreOrAPI().pipe(
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
      last()
    );
  }
}
