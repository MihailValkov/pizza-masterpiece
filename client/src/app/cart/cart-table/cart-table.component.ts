import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from "@angular/core";
import { MatLegacyDialog as MatDialog } from "@angular/material/legacy-dialog";
import { MatLegacyPaginator as MatPaginator } from "@angular/material/legacy-paginator";
import { MatSort } from "@angular/material/sort";
import { MatLegacyTableDataSource as MatTableDataSource } from "@angular/material/legacy-table";
import { Store } from "@ngrx/store";
import { IUserDataState } from "src/app/core/+store";
import { removeProductFromCart, updateProductQuantity } from "src/app/core/+store/cart/actions";
import { ICartProduct } from "src/app/shared/interfaces/product";
import { CartProductDetailComponent } from "./cart-product-detail/cart-product-detail.component";

@Component({
  selector: "app-cart-table",
  templateUrl: "./cart-table.component.html",
  styleUrls: ["../../shared/styles/table.css", "./cart-table.component.css"],
})
export class CartTableComponent implements AfterViewInit, OnInit, OnChanges {
  @Input() products!: ICartProduct[];
  displayedColumns = ["name", "price", "quantity", "totalPrice", "actions"];
  dataSource!: MatTableDataSource<ICartProduct>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private store: Store<IUserDataState>, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.products);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource = new MatTableDataSource(changes["products"].currentValue);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  showProductDetail(product: ICartProduct) {
    this.dialog.open(CartProductDetailComponent, {
      data: product,
      autoFocus: false,
    });
  }

  updateQuantity(uniqueId: string, actionType: "increase" | "decrease") {
    this.store.dispatch(updateProductQuantity({ uniqueId, actionType }));
  }

  removeFromCart(uniqueId: string) {
    this.store.dispatch(removeProductFromCart({ uniqueId }));
  }
}
