import { Component, Input } from '@angular/core';
import { IBaseAdminOrderProduct } from 'src/app/shared/interfaces/admin';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent {
  @Input() product!: IBaseAdminOrderProduct;
}
