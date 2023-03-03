import { AfterViewInit, Component, OnDestroy, ViewChild } from "@angular/core";
import { MatLegacyDialog as MatDialog } from "@angular/material/legacy-dialog";
import { MatLegacyPaginator as MatPaginator } from "@angular/material/legacy-paginator";
import { MatSort } from "@angular/material/sort";
import { ActivatedRoute } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Subscription, merge, filter, map, startWith, tap } from "rxjs";
import { IAdminModuleState } from "src/app/admin/+store";
import {
  selectAdminProductsProductList,
  selectAdminProductsProductListCount,
  selectAdminProductsProductListErrorMessage,
  selectAdminProductsProductListIsLoading,
} from "src/app/admin/+store/products/selectors";
import { clearProducts, loadProductsStart, loadProductStart } from "src/app/admin/+store/products/actions";
import { ProductDetailComponent } from "../product-detail/product-detail.component";

@Component({
  selector: "app-products-table",
  templateUrl: "./products-table.component.html",
  styleUrls: ["../../../../shared/styles/table.css", "./products-table.component.css"],
})
export class ProductsTableComponent implements AfterViewInit, OnDestroy {
  products$ = this.store.pipe(select(selectAdminProductsProductList));
  productsCount$ = this.store.pipe(select(selectAdminProductsProductListCount));
  productsIsLoading$ = this.store.pipe(select(selectAdminProductsProductListIsLoading));
  productsErrorMessage$ = this.store.pipe(select(selectAdminProductsProductListErrorMessage));
  subscription!: Subscription;

  searchValue: string = "";
  selectValue: string = "";
  displayedColumns: string[] = ["name", "rating", "createdAt", "updatedAt", "actions"];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private store: Store<IAdminModuleState>,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngAfterViewInit() {
    this.subscription = merge(
      this.sort.sortChange,
      this.paginator.page,
      this.activatedRoute.queryParams.pipe(
        filter(params => params["searchValue"] || params["selectValue"]),
        map(({ searchValue, selectValue }) => [searchValue, selectValue])
      )
    )
      .pipe(
        startWith({}),
        tap(params => {
          if (Array.isArray(params)) {
            this.searchValue = params[0];
            this.selectValue = params[1];
          }

          this.store.dispatch(
            loadProductsStart({
              page: this.paginator.pageIndex,
              limit: this.paginator.pageSize,
              sort: this.sort.active,
              order: this.sort.direction,
              searchValue: this.searchValue,
              selectValue: this.selectValue,
            })
          );
        })
      )
      .subscribe();
  }

  showProductDetail(productId: string) {
    this.store.dispatch(loadProductStart({ productId }));
    this.dialog.open(ProductDetailComponent, { autoFocus: false });
  }

  ngOnDestroy(): void {
    this.store.dispatch(clearProducts());
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
