import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { combineLatest, startWith } from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  // @Input()
  product = {
    _id: '123asd21',
    title: 'Pizza',
    imageUrl:
      'https://images.unsplash.com/photo-1474600056930-615c3d706456?ixlib=rb-0.3.5&s=dc82336ad3e3873b0a81e9389d346916&auto=format&fit=crop&w=1952&q=80',
    description: `Enjoy the highest calorie delicious traditional Italian pizza with fresh arugula and original italian tomato
    sauce, sprinkled with the soul of your enemies & slow cooked for 30 hours..`,
  };
  @ViewChild('extrasInput') extrasInput!: ElementRef<HTMLInputElement>;
  // form!: FormGroup;
  sizeControl = new FormControl('normal', Validators.required);
  doughControl = new FormControl('traditional', Validators.required);
  extrasControl = new FormControl('');
  separatorKeysCodes: number[] = [ENTER, COMMA];
  extras: string[] = [];
  extrasList: string[] = [
    'Extra cheese',
    'Mushroom',
    'Onion',
    'Pepperoni',
    'Sausage',
    'Tomato',
  ];
  // filteredExtras: Observable<string[]>;
  vegetables = [
    { name: 'apple' },
    { name: 'banana' },
    { name: 'strawberry' },
    { name: 'orange' },
    { name: 'kiwi' },
    { name: 'cherry' },
  ];
  amount = 1;
  amountControl = new FormControl(this.amount, [Validators.min(1)]);
  panelOpenState=true;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    combineLatest([
      this.amountControl.valueChanges.pipe(startWith(this.amount)),
      this.sizeControl.valueChanges.pipe(startWith('normal')),
      this.doughControl.valueChanges.pipe(startWith('traditional')),
      this.extrasControl.valueChanges.pipe(startWith([])),
    ]).subscribe((x) => console.log(x));
    // this.form = this.fb.group({
    //   size: ['', [Validators.required]],
    // });
  }

  increaseAmount(): void {
    this.amountControl.setValue(this.amountControl.value + 1);
  }
  decreaseAmount(): void {
    const value = this.amountControl.value;
    if (value > 1) {
      this.amountControl.setValue(value - 1);
    }
  }

  select(extra:string){
    console.log(extra);
    
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value && !this.extras.includes(value)) {
      this.extras.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.extrasControl.setValue(null);
  }
  selected(event: MatAutocompleteSelectedEvent): void {
    const value = event.option.viewValue;
    const extraIndex = this.extras.indexOf(value);
    if (value && extraIndex === -1) {
      this.extras.push(value);
      this.extrasList.splice(this.extrasList.indexOf(value), 1);
      this.extrasInput.nativeElement.value = '';
      this.extrasControl.setValue(null);
    }
  }

  remove(extra: string) {
    const extras = this.extrasControl.value.filter((e: string) => e !== extra);
    this.extrasControl.setValue(extras);
  }
}
