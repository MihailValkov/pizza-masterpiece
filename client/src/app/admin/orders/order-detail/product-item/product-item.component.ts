import { Component, Input, OnInit } from '@angular/core';
import { IBaseAdminOrderProduct } from 'src/app/shared/interfaces/admin';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  @Input() product!:IBaseAdminOrderProduct
  constructor() { }

  ngOnInit(): void {
  }

}
