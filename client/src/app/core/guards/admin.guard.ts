import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { map, Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';

import { IRootState } from 'src/app/+store';
import { selectUser } from 'src/app/+store/selectors';

@Injectable()
export class AdminGuard implements CanActivate {
  user$ = this.store.pipe(select(selectUser));

  constructor(private store: Store<IRootState>, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.user$.pipe(map((user) => user?.role === 'Admin'));
  }
}
