import { Component, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { select, Store } from '@ngrx/store';
import { merge, Subscription } from 'rxjs';
import { startWith, tap } from 'rxjs/operators';
import { IOrderModuleState } from '../../+store';
import { clearOrders, loadOrdersStart } from '../../+store/actions';
import {
  selectOrderIsLoading,
  selectOrdersList,
  selectOrdersCount,
} from '../../+store/selectors';

@Component({
  selector: 'app-order-table',
  templateUrl: './orders-table.component.html',
  styleUrls: [
    '../../../shared/styles/table.css',
    './orders-table.component.css',
  ],
})
export class OrderTableComponent implements AfterViewInit, OnDestroy {
  orders$ = this.store.pipe(select(selectOrdersList));
  ordersCount$ = this.store.pipe(select(selectOrdersCount));
  isLoading$ = this.store.pipe(select(selectOrderIsLoading));
  subscription!: Subscription;

  displayedColumns: string[] = [
    '_id',
    'totalProducts',
    'totalPrice',
    'status',
    'paymentMethod',
    'createdAt',
    'actions',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private store: Store<IOrderModuleState>) {}

  ngAfterViewInit() {
    this.subscription = merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith(null),
        tap(() => {
          this.store.dispatch(
            loadOrdersStart({
              page: this.paginator.pageIndex,
              limit: this.paginator.pageSize,
              sort: this.sort.active,
              order: this.sort.direction,
            })
          );
        })
      )
      .subscribe();
  }
  ngOnDestroy(): void {
    this.store.dispatch(clearOrders());
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
