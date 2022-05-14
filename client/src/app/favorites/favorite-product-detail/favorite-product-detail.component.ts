import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CartProductDetailComponent } from 'src/app/cart/cart-table/cart-product-detail/cart-product-detail.component';
import { ICartProduct } from 'src/app/shared/interfaces/product';

@Component({
  selector: 'app-favorite-product-detail',
  templateUrl: './favorite-product-detail.component.html',
  styleUrls: ['./favorite-product-detail.component.css'],
})
export class FavoriteProductDetailComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<CartProductDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ICartProduct
  ) {}

  ngOnInit(): void {}
}
