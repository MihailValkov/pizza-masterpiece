import { AfterViewInit, Component, Input, OnInit, ViewChild } from "@angular/core";
import { MatLegacyDialog as MatDialog } from "@angular/material/legacy-dialog";
import { MatLegacyPaginator as MatPaginator } from "@angular/material/legacy-paginator";
import { MatSort } from "@angular/material/sort";
import { MatLegacyTableDataSource as MatTableDataSource } from "@angular/material/legacy-table";
import { Store } from "@ngrx/store";
import { IUserDataState } from "src/app/core/+store";
import { addProductToCart } from "src/app/core/+store/cart/actions";
import { removeProductFromFavorites } from "src/app/core/+store/favorites/actions";
import { ICartProduct } from "src/app/shared/interfaces/product";
import { FavoriteProductDetailComponent } from "../favorite-product-detail/favorite-product-detail.component";

@Component({
  selector: "app-favorites-table",
  templateUrl: "./favorites-table.component.html",
  styleUrls: ["../../shared/styles/table.css", "./favorites-table.component.css"],
})
export class FavoritesTableComponent implements OnInit, AfterViewInit {
  @Input() products!: ICartProduct[];
  displayedColumns = ["name", "rating", "size", "dough", "weight", "actions"];

  dataSource!: MatTableDataSource<ICartProduct>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private store: Store<IUserDataState>, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.products);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (data, sortHeaderId: string) => {
      return this.getPropertyByPath(data, sortHeaderId);
    };
  }

  getPropertyByPath(obj: Object, pathString: string) {
    return pathString.split(".").reduce((o: any, i) => o[i], obj);
  }

  addToCart(product: ICartProduct) {
    this.store.dispatch(addProductToCart({ product }));
  }

  showProductDetail(product: ICartProduct) {
    this.dialog.open(FavoriteProductDetailComponent, {
      data: product,
      autoFocus: false,
    });
  }

  removeFromFavorites(uniqueId: string, name: string) {
    this.store.dispatch(removeProductFromFavorites({ uniqueId, name }));
    this.dataSource.data = this.dataSource.data.filter(p => p.uniqueId !== uniqueId);
  }
}
