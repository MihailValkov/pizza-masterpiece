import { AfterViewInit, Component, Input, OnInit, ViewChild } from "@angular/core";
import { MatLegacyDialog as MatDialog } from "@angular/material/legacy-dialog";
import { MatLegacyPaginator as MatPaginator } from "@angular/material/legacy-paginator";
import { MatSort } from "@angular/material/sort";
import { MatLegacyTableDataSource as MatTableDataSource } from "@angular/material/legacy-table";
import { IOrderBaseProduct } from "src/app/shared/interfaces/order";
import { RateProductComponent } from "../rate-product/rate-product.component";
import { ProductDetailComponent } from "./product-detail/product-detail.component";

@Component({
  selector: "app-products-table",
  templateUrl: "./products-table.component.html",
  styleUrls: ["../../../shared/styles/table.css", "./products-table.component.css"],
})
export class ProductsTableComponent implements OnInit, AfterViewInit {
  @Input() products!: IOrderBaseProduct[];
  @Input() orderId!: string;
  @Input() ratedProducts!: string[];

  displayedColumns: string[] = ["name", "quantity", "price", "totalPrice", "actions"];
  dataSource!: MatTableDataSource<IOrderBaseProduct>;

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

  showProductDetail(_id: string) {
    this.dialog.open(ProductDetailComponent, {
      data: { _id, orderId: this.orderId },
      autoFocus: false,
    });
  }

  showRateModal(_id: string, productId: string) {
    this.dialog.open(RateProductComponent, {
      data: { orderId: this.orderId, _id, productId },
      autoFocus: false,
    });
  }

  isAlreadyRated(productId: string) {
    return this.ratedProducts.includes(productId);
  }
}
