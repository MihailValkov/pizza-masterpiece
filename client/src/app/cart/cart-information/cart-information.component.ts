import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IUserDataState } from 'src/app/core/+store';
import {
  selectTaxes,
  selectPrice,
  selectTotalProducts,
} from 'src/app/core/+store/cart/selectors';

@Component({
  selector: 'app-cart-information',
  templateUrl: './cart-information.component.html',
  styleUrls: ['./cart-information.component.css'],
})
export class CartInformationComponent implements OnInit {
  @Input() canContinue: boolean = false;
  totalPrice = this.store.pipe(select(selectPrice));
  totalProducts = this.store.pipe(select(selectTotalProducts));
  taxes = this.store.pipe(select(selectTaxes));

  constructor(private store: Store<IUserDataState>) {}

  ngOnInit(): void {
    console.log(this.canContinue);
  }
}
