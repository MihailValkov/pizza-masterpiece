import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ICartProduct } from 'src/app/shared/interfaces/product';

@Component({
  selector: 'app-cart-table',
  templateUrl: './cart-table.component.html',
  styleUrls: ['./cart-table.component.css'],
})
export class CartTableComponent implements AfterViewInit, OnInit {
  @Input() products: ICartProduct[] = [];
  displayedColumns: string[] = [
    'product',
    'price',
    'quantity',
    'total',
    'action',
  ];
  dataSource!: MatTableDataSource<ICartProduct>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(
      this.products.concat(...this.products).concat(...this.products)
    );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
