import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
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
import { RateProductComponent } from '../../orders-list/rate-product/rate-product.component';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.css'],
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
    const products = this.products.map((p) => ({ ...p, isExpanded: false }));
    this.dataSource = new MatTableDataSource(products);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openDialog(productId: string, productName: string, imageUrl: string) {
    this.dialog.open(RateProductComponent, {
      data: { orderId: this.orderId, productId, productName, imageUrl },
    });
  }
}
