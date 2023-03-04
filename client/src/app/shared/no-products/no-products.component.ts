import { Component, Input } from "@angular/core";
@Component({
  selector: "app-no-products",
  templateUrl: "./no-products.component.html",
  styleUrls: ["./no-products.component.css"],
})
export class NoProductsComponent {
  @Input() type: "cart" | "favorites" | "orders" = "cart";
}
