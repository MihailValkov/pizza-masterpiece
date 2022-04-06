import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import {
  combineLatest,
  filter,
  map,
  Observable,
  startWith,
  Subscription,
  switchMap,
} from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { select, Store } from '@ngrx/store';
import { IProductModuleState } from '../+store';
import { loadProductStart } from '../+store/actions';
import { ActivatedRoute } from '@angular/router';
import { selectCurrentProduct } from '../+store/selectors';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  @ViewChild('extrasInput') extrasInput!: ElementRef<HTMLInputElement>;

  separatorKeysCodes: number[] = [ENTER, COMMA];
  product$ = this.store.pipe(select(selectCurrentProduct));
  sizeControl = new FormControl('', Validators.required);
  doughControl = new FormControl('', Validators.required);
  amountControl = new FormControl(1, Validators.min(1));
  extrasControl = new FormControl([]);
  extras: string[] = [];
  totalPrice = 0;
  subscription: Subscription = new Subscription();

  constructor(
    private store: Store<IProductModuleState>,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.calculateTotalPrice().subscribe((price) => (this.totalPrice = price))
    );

    this.subscription.add(
      this.product$.subscribe((product) => {
        this.sizeControl.setValue(product?.sizes[0].size);
        this.doughControl.setValue(product?.doughs[0].dough);
      })
    );

    const { id } = this.activatedRoute.snapshot.params;
    this.store.dispatch(loadProductStart({ id }));
  }

  setAmountValue(type: 'increase' | 'decrease'): void {
    const value = this.amountControl.value;
    if (type === 'increase') {
      this.amountControl.setValue(value + 1);
    } else {
      value > 1 && this.amountControl.setValue(value - 1);
    }
  }

  calculateTotalPrice(): Observable<number> {
    return combineLatest([
      this.amountControl.valueChanges.pipe(startWith(1)),
      this.sizeControl.valueChanges.pipe(startWith('')),
      this.doughControl.valueChanges.pipe(startWith('')),
      this.extrasControl.valueChanges.pipe(startWith([])),
    ]).pipe(
      filter(([amount, size, dough, extras]) => !!size && !!dough),
      switchMap(([amount, size, dough, extras]) =>
        this.product$.pipe(
          map((product) => {
            const sizePrice =
              product?.sizes.find((s) => s.size === size)?.price || 0;
            const doughPrice =
              product?.doughs.find((s) => s.dough === dough)?.price || 0;
            const extrasPrice =
              product?.extras
                .filter((e) => extras.includes(e.extra))
                .reduce((a, b) => a + b.price, 0) || 0;

            return amount * (sizePrice + doughPrice + extrasPrice);
          })
        )
      )
    );
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const value = event.option.viewValue;
    const extraIndex = this.extras.indexOf(value);
    if (value && extraIndex === -1) {
      this.extras.push(value);
      this.extrasInput.nativeElement.value = '';
      this.extrasControl.setValue(null);
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value && !this.extras.includes(value)) {
      this.extras.push(value);
    }
    event.chipInput!.clear();
    this.extrasControl.setValue(null);
  }

  remove(extra: string) {
    const extras = this.extrasControl.value.filter((e: string) => e !== extra);
    this.extrasControl.setValue(extras);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
