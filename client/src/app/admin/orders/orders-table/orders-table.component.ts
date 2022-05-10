import { Component, OnInit } from '@angular/core';
import { IBaseAdminOrder } from 'src/app/shared/interfaces/admin';

interface ITableUser extends IBaseAdminOrder {
  isExpanded: boolean;
}
@Component({
  selector: 'app-orders-table',
  templateUrl: './orders-table.component.html',
  styleUrls: ['./orders-table.component.css']
})
export class OrdersTableComponent implements OnInit {

  orders$ = this.store.pipe(select(selectAdminOrdersList));
  ordersCount$ = this.store.pipe(select(selectAdminOrdersListCount));
  ordersIsLoading$ = this.store.pipe(select(selectAdminOrdersIsLoading));
  ordersErrorMessage$ = this.store.pipe(select(selectAdminOrdersErrorMessage));
  subscription!: Subscription;

  searchValue: string = '';
  selectValue: string = '';
  users: ITableUser[] = [];
  displayedColumns: string[] = [
    '_id',
    'email',
    'fullName',
    'address',
    'totalProducts',
    'totalPrice',
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
