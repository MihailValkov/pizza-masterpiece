import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

import {
  catchError,
  filter,
  first,
  last,
  map,
  Observable,
  of,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { select, Store } from '@ngrx/store';

import { IRootState } from 'src/app/+store';
import { selectUser } from 'src/app/+store/selectors';
import { authenticateStart } from 'src/app/+store/actions';

import { IUser } from 'src/app/shared/interfaces/user';

@Injectable()
export class AuthGuard implements CanActivateChild {
  user$ = this.store.pipe(select(selectUser));
  constructor(private store: Store<IRootState>, private router: Router) {
    // this.store.dispatch(authenticateStart());
  }

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
    // return this.user$.pipe(
    //   switchMap((user) => {
    //     if (user === undefined) {
    //       return this.authService.authenticate().pipe(
    //         tap((user: IUser) => this.store.dispatch(authenticateSuccess({ user }))),
    //         catchError(() => {
    //           this.store.dispatch(authenticateFailure())
    //           return [null];
    //         }),
    //         last()
    //       );
    //     }
    //     return [user];
    //   }),
    //   map(
    //     (user) =>
    //       typeof childRoute.data?.['isLogged'] !== 'boolean' ||
    //       childRoute.data?.['isLogged'] === !!user
    //   ),
    //   tap((canContinue) => {
    //     if (canContinue) {
    //       return;
    //     }
    //     this.router.navigate(['/']);
    //   }),
    //   first()
    // );

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
