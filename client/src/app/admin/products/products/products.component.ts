import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"],
})
export class ProductsComponent {
  searchCriterion = [
    { prop: "name", value: "Product name" },
    { prop: "rating", value: "Rating" },
  ];
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  onSearchHandler(queryParams: { searchValue: string; selectValue: string }) {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: queryParams,
      queryParamsHandling: "merge",
    });
  }
}
