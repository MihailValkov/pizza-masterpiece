import { Component } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-orders",
  templateUrl: "./orders.component.html",
  styleUrls: ["./orders.component.css"],
})
export class OrdersComponent {
  searchCriterion = [
    { prop: "_id", value: "Order Id" },
    { prop: "user.email", value: "User Email" },
    { prop: "user.firstName", value: "First Name" },
    { prop: "user.lastName", value: "Last Name" },
    { prop: "totalProducts", value: "Total Products" },
    { prop: "totalPrice", value: "Total Price" },
    { prop: "status", value: "Order Status" },
    { prop: "paymentMethod", value: "Payment Method" },
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
