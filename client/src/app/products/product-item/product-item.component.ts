import { Component, Input } from '@angular/core';
import { IBaseProduct } from 'src/app/shared/interfaces/product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent {
  @Input() product!: IBaseProduct;
  
  constructor() {}
}
