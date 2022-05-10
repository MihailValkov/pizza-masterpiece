import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import {
  Subscription,
  merge,
  filter,
  map,
  startWith,
  tap,
  switchMap,
} from 'rxjs';
import { IBaseAdminOrder } from 'src/app/shared/interfaces/admin';
import { IAdminModuleState } from '../../+store';
import {
  loadOrdersStart,
  loadOrderStart,
  clearOrders,
} from '../../+store/orders/actions';
import {
  selectAdminOrdersList,
  selectAdminOrdersListCount,
  selectAdminOrdersIsLoading,
  selectAdminOrdersErrorMessage,
} from '../../+store/orders/selectors';

interface ITableOrder extends IBaseAdminOrder {
  isExpanded: boolean;
}
@Component({
  selector: 'app-orders-table',
  templateUrl: './orders-table.component.html',
  styleUrls: ['../../styles/table.css', './orders-table.component.css'],
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
export class OrdersTableComponent {
  orders$ = this.store.pipe(select(selectAdminOrdersList));
  ordersCount$ = this.store.pipe(select(selectAdminOrdersListCount));
  ordersIsLoading$ = this.store.pipe(select(selectAdminOrdersIsLoading));
  ordersErrorMessage$ = this.store.pipe(select(selectAdminOrdersErrorMessage));
  subscription!: Subscription;

  searchValue: string = '';
  selectValue: string = '';
  orders: ITableOrder[] = [];
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
            loadOrdersStart({
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
          this.orders$.pipe(
            map((orders) => orders.map((o) => ({ ...o, isExpanded: false })))
          )
        )
      )
      .subscribe((orders: ITableOrder[]) => (this.orders = orders));
  }

  onExpand(orderId: string) {
    this.orders = this.orders.map((o) =>
      o._id === orderId ? o : { ...o, isExpanded: false }
    );
    this.store.dispatch(loadOrderStart({ orderId }));
  }

  ngOnDestroy(): void {
    this.store.dispatch(clearOrders());
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
