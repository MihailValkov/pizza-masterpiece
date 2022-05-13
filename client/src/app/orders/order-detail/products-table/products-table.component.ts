import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IOrderProductDetail } from 'src/app/shared/interfaces/order';
import { RateProductComponent } from '../rate-product/rate-product.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.css'],
})
export class ProductsTableComponent implements OnInit, AfterViewInit {
  @Input() products!: IOrderProductDetail[];
  @Input() orderId!: string;

  displayedColumns: string[] = [
    'product',
    'price',
    'quantity',
    'total',
    'action',
  ];
  dataSource!: MatTableDataSource<IOrderProductDetail>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.products);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  showRateModal(productId: string, productName: string, imageUrl: string) {
    this.dialog.open(RateProductComponent, {
      data: { orderId: this.orderId, productId, productName, imageUrl },
    });
  }

  showProductDetail(product: IOrderProductDetail) {
    this.dialog.open(ProductDetailComponent, {
      data: product,
    });
  }
}
