import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ICartProduct } from "src/app/shared/interfaces/product";

@Component({
  selector: "app-cart-product-detail",
  templateUrl: "./cart-product-detail.component.html",
  styleUrls: ["./cart-product-detail.component.css"],
})
export class CartProductDetailComponent {
  constructor(
    public dialogRef: MatDialogRef<CartProductDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ICartProduct
  ) {}
}
