import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { IUserDataState } from 'src/app/core/+store';
import {
  removeProductFromCart,
  updateProductQuantity,
} from 'src/app/core/+store/cart/actions';
import { ICartProduct } from 'src/app/shared/interfaces/product';

@Component({
  selector: 'app-cart-table',
  templateUrl: './cart-table.component.html',
  styleUrls: ['./cart-table.component.css', '../../shared/styles/table.css'],
})
export class CartTableComponent implements AfterViewInit, OnInit, OnChanges {
  @Input() products!: ICartProduct[];
  displayedColumns: string[] = [
    'name',
    'price',
    'quantity',
    'totalPrice',
    'action',
  ];
  dataSource!: MatTableDataSource<ICartProduct>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private store: Store<IUserDataState>) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.products);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource = new MatTableDataSource(changes['products'].currentValue);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  updateQuantity(index: number, actionType: 'increase' | 'decrease') {
    this.store.dispatch(updateProductQuantity({ index, actionType }));
  }

  removeFromCart(index: number) {
    this.store.dispatch(removeProductFromCart({ index }));
  }
}
