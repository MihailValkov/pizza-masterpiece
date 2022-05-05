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
  tap,
} from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { select, Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { IRootState } from 'src/app/+store';
import { selectCurrentProduct } from 'src/app/+store/products/selectors';
import {
  clearProduct,
  loadProductStart,
} from 'src/app/+store/products/actions';
import {
  ICartProduct,
  IFavoriteProduct,
} from 'src/app/shared/interfaces/product';
import { addProductToCart } from 'src/app/core/+store/cart/actions';
import { addProductToFavorites } from 'src/app/core/+store/favorites/actions';
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
  quantityControl = new FormControl(1, Validators.min(1));
  extrasControl = new FormControl([]);
  extras: string[] = [];
  selectedProduct!: ICartProduct;
  subscription: Subscription = new Subscription();

  constructor(
    private store: Store<IRootState>,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.calculateTotalPrice().subscribe((price) => {
        this.selectedProduct.price = price;
        this.selectedProduct.totalPrice = price * this.quantityControl.value;
      })
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

  addToCart() {
    this.store.dispatch(addProductToCart({ product: this.selectedProduct }));
  }

  addToFavorites() {
    const { _id, name, imageUrl, rating, size, dough, gr } =
      this.selectedProduct;
    const product: IFavoriteProduct = {
      _id,
      name,
      imageUrl,
      rating,
      size,
      dough,
      gr,
    };
    this.store.dispatch(addProductToFavorites({ product }));
  }

  setAmountValue(type: 'increase' | 'decrease'): void {
    const value = this.quantityControl.value;
    if (type === 'increase') {
      this.quantityControl.setValue(value + 1);
    } else {
      value > 1 && this.quantityControl.setValue(value - 1);
    }
  }

  calculateTotalPrice(): Observable<number> {
    return combineLatest([
      this.quantityControl.valueChanges.pipe(startWith(1)),
      this.sizeControl.valueChanges.pipe(startWith('')),
      this.doughControl.valueChanges.pipe(startWith('')),
      this.extrasControl.valueChanges.pipe(startWith([])),
    ]).pipe(
      filter(([quantity, size, dough, extras]) => !!size && !!dough),
      switchMap(([quantity, size, dough, extras]) =>
        this.product$.pipe(
          map((product) => {
            const selectedSize = product!.sizes.find((s) => s.size === size)!;
            const selectedDough = product!.doughs.find(
              (s) => s.dough === dough
            )!;
            const selectedExtras = product!.extras.filter((e) =>
              extras.includes(e.extra)
            );
            return {
              selectedSize,
              selectedDough,
              selectedExtras,
              product,
            };
          }),
          tap(({ selectedSize, selectedDough, selectedExtras, product }) => {
            this.selectedProduct = {
              _id: product!._id,
              uniqueId: `${selectedSize.size}-${
                selectedDough.dough
              }-${selectedExtras.map((e) => e.extra).join('-')}`,
              name: product!.name,
              imageUrl: product!.image.url,
              size: selectedSize,
              dough: selectedDough,
              extras: selectedExtras,
              gr: selectedSize.pieces * 85,
              rating: product!.rating,
              quantity,
              price: 0,
              totalPrice: 0,
            };
          }),
          map(({ selectedSize, selectedDough, selectedExtras }) => {
            const sizePrice = selectedSize?.price || 0;
            const doughPrice = selectedDough?.price || 0;
            const extrasPrice =
              selectedExtras?.reduce((a, b) => a + b.price, 0) || 0;
            const price = sizePrice + doughPrice + extrasPrice;

            return price;
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
    this.store.dispatch(clearProduct());
  }
}
