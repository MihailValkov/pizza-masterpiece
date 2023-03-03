import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { map, Observable, tap } from "rxjs";
import { select, Store } from "@ngrx/store";

import { IRootState } from "src/app/+store";
import { selectUser } from "src/app/+store/auth/selectors";

@Injectable()
export class AdminGuard implements CanActivate {
  user$ = this.store.pipe(select(selectUser));

  constructor(private store: Store<IRootState>, private router: Router) {}

  canActivate(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Observable<boolean> {
    return this.user$.pipe(
      map(user => user?.role === "Admin"),
      tap(canContinue => {
        if (canContinue) {
          return;
        }
        this.router.navigateByUrl("/");
      })
    );
  }
}
