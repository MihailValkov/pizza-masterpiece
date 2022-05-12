import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
import { OrderDetailComponent } from '../order-detail/order-detail.component';
@Component({
  selector: 'app-orders-table',
  templateUrl: './orders-table.component.html',
  styleUrls: [
    '../../../shared/styles/table.css',
    './orders-table.component.css',
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
  displayedColumns: string[] = [
    'email',
    'firstName',
    'lastName',
    'totalProducts',
    'totalPrice',
    'status',
    'paymentMethod',
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
            loadOrdersStart({
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

  showOrderDetail (orderId: string) {
    this.store.dispatch(loadOrderStart({ orderId }));
    this.dialog.open(OrderDetailComponent, { autoFocus: false });
  }

  ngOnDestroy(): void {
    this.store.dispatch(clearOrders());
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
