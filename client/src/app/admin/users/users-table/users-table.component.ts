import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import {
  filter,
  map,
  merge,
  startWith,
  Subscription,
  switchMap,
  tap,
} from 'rxjs';
import { IBaseAdminUser } from 'src/app/shared/interfaces/admin';
import { IAdminModuleState } from '../../+store';
import {
  clearUsers,
  loadUsersStart,
  loadUserStart,
} from '../../+store/users/actions';
import {
  selectAdminUsersErrorMessage,
  selectAdminUsersIsLoading,
  selectAdminUsersList,
  selectAdminUsersListCount,
  selectAdminUsersRoles,
} from '../../+store/users/selectors';
import { UserTableDetailComponent } from './user-table-detail/user-table-detail.component';
@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: [
    '../../../shared/styles/table.css',
    './users-table.component.css',
  ],
})
export class UsersTableComponent implements AfterViewInit {
  users$ = this.store.pipe(select(selectAdminUsersList));
  usersCount$ = this.store.pipe(select(selectAdminUsersListCount));
  usersRoles$ = this.store.pipe(select(selectAdminUsersRoles));
  usersIsLoading$ = this.store.pipe(select(selectAdminUsersIsLoading));
  errorMessage$ = this.store.pipe(select(selectAdminUsersErrorMessage));
  subscription!: Subscription;

  searchValue: string = '';
  selectValue: string = '';
  displayedColumns: string[] = [
    '_id',
    'email',
    'fullName',
    'ordersCount',
    'ratedProductsCount',
    'accountStatus',
    'role',
    'createdAt',
    'actions',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private store: Store<IAdminModuleState>,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngAfterViewInit() {
    this.subscription = merge(
      this.sort.sortChange,
      this.paginator.page,
      this.activatedRoute.queryParams.pipe(
        filter((params) => params['searchValue'] || params['selectValue']),
        map(({ searchValue, selectValue }) => [searchValue, selectValue])
      )
    )
      .pipe(
        startWith({}),
        tap((params) => {
          if (Array.isArray(params)) {
            this.searchValue = params[0];
            this.selectValue = params[1];
          }

          this.store.dispatch(
            loadUsersStart({
              page: this.paginator.pageIndex,
              limit: this.paginator.pageSize,
              sort: this.sort.active,
              order: this.sort.direction,
              searchValue: this.searchValue,
              selectValue: this.selectValue,
            })
          );
        })
      )
      .subscribe();
  }

  showUserDetail(userId: string) {
    this.store.dispatch(loadUserStart({ userId }));
    this.dialog.open(UserTableDetailComponent);
  }

  ngOnDestroy(): void {
    this.store.dispatch(clearUsers());
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
