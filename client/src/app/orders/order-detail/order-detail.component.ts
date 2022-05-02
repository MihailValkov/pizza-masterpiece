import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { IOrderModuleState } from '../+store';
import { loadOrderStart } from '../+store/actions';
import { selectCurrentOrder } from '../+store/selectors';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css'],
})
export class OrderDetailComponent implements OnInit {
  currentOrder$ = this.store.pipe(select(selectCurrentOrder));

  constructor(
    private store: Store<IOrderModuleState>,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const { orderId } = this.activatedRoute.snapshot.params;
    this.store.dispatch(loadOrderStart({ orderId }));
  }
}
