import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { selectUserIsLogged } from 'src/app/+store/selectors';
import { IUserDataState } from 'src/app/core/+store';
import {
  selectCheckoutIsLoading,
  selectCheckoutErrorMessage,
  selectCheckoutLastOrderId,
} from 'src/app/core/+store/cart/selectors';

@Component({
  selector: 'app-checkout-complete',
  templateUrl: './checkout-complete.component.html',
  styleUrls: ['./checkout-complete.component.css'],
})
export class CheckoutCompleteComponent implements OnInit {
  isLoading$ = this.store.pipe(select(selectCheckoutIsLoading));
  errorMessage$ = this.store.pipe(select(selectCheckoutErrorMessage));
  orderId$ = this.store.pipe(select(selectCheckoutLastOrderId));
  isLogged$ = this.store.pipe(select(selectUserIsLogged));

  constructor(private store: Store<IUserDataState>) {}

  ngOnInit(): void {}
}
