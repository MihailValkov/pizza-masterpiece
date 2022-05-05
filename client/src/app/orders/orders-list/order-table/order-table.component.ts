import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { select, Store } from '@ngrx/store';
import { merge } from 'rxjs';
import { startWith, tap } from 'rxjs/operators';
import { IOrderModuleState } from '../../+store';
import { loadOrdersStart } from '../../+store/actions';
import {
  selectOrderErrorMessage,
  selectOrderIsLoading,
  selectOrders,
  selectOrdersCount,
} from '../../+store/selectors';

@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.css'],
})
export class OrderTableComponent implements AfterViewInit {
  displayedColumns: string[] = [
    '_id',
    'createdAt',
    'address',
    'status',
    'totalProducts',
    'price',
  ];

  orders$ = this.store.pipe(select(selectOrders));
  ordersCount$ = this.store.pipe(select(selectOrdersCount));
  isLoading$ = this.store.pipe(select(selectOrderIsLoading));
  errorMessage$ = this.store.pipe(select(selectOrderErrorMessage));

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private store: Store<IOrderModuleState>) {}

  ngAfterViewInit() {
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
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
      .subscribe((x) => console.log(x));
  }
}
