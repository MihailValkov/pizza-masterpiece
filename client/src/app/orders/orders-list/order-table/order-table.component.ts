import {
  Component,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  Input,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { select, Store } from '@ngrx/store';
import { merge } from 'rxjs';
import { startWith, tap } from 'rxjs/operators';
import { IOrder } from 'src/app/shared/interfaces/order';
import { IOrderModuleState } from '../../+store';
import { clearOrders, loadOrdersStart } from '../../+store/actions';
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
export class OrderTableComponent implements AfterViewInit, OnDestroy {
  orders$ = this.store.pipe(select(selectOrders));
  ordersCount$ = this.store.pipe(select(selectOrdersCount));
  isLoading$ = this.store.pipe(select(selectOrderIsLoading));
  errorMessage$ = this.store.pipe(select(selectOrderErrorMessage));

  displayedColumns: string[] = [
    '_id',
    'createdAt',
    'address',
    'status',
    'totalProducts',
    'totalPrice',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private store: Store<IOrderModuleState>) {}

  ngAfterViewInit() {
    merge(this.sort.sortChange, this.paginator.page)
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
      .subscribe((x) => console.log(x));
  }
  ngOnDestroy(): void {
    this.store.dispatch(clearOrders());
  }
}
