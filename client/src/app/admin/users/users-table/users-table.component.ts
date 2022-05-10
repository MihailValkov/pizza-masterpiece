import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
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

interface ITableUser extends IBaseAdminUser {
  isExpanded: boolean;
}

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['../../styles/table.css', './users-table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
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
  users: ITableUser[] = [];
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
    private activatedRoute: ActivatedRoute
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
        }),
        switchMap(() =>
          this.users$.pipe(
            map((users) => users.map((u) => ({ ...u, isExpanded: false })))
          )
        )
      )
      .subscribe((users: ITableUser[]) => (this.users = users));
  }

  onExpand(userId: string) {
    this.users = this.users.map((u) =>
      u._id === userId ? u : { ...u, isExpanded: false }
    );
    this.store.dispatch(loadUserStart({ userId }));
  }

  ngOnDestroy(): void {
    this.store.dispatch(clearUsers());
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
