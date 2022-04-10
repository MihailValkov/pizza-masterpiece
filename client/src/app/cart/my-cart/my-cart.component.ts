import { Component, OnInit } from '@angular/core';
import { ICartProduct } from 'src/app/shared/interfaces/product';

const products: ICartProduct[] = [
  {
    _id: '1231231df',
    name: 'Margarita',
    imageUrl:
      'https://res.cloudinary.com/dofijitd8/image/upload/v1648402660/pizza-masterpiece/images/products/puqacesuofmvv14lus80.jpg',

    price: 15.99,
    quantity: 2,
    totalPrice: 31,
  },
  {
    _id: '1231231df123123asd',
    name: 'Test Pizza',
    imageUrl:
      'https://res.cloudinary.com/dofijitd8/image/upload/v1648402660/pizza-masterpiece/images/products/puqacesuofmvv14lus80.jpg',

    price: 11.99,
    quantity: 1,
    totalPrice: 11.99,
  },
  {
    _id: '1231231asdasddf',
    name: 'Tommatto Pizza',
    imageUrl:
      'https://res.cloudinary.com/dofijitd8/image/upload/v1648402660/pizza-masterpiece/images/products/puqacesuofmvv14lus80.jpg',

    price: 12.99,
    quantity: 3,
    totalPrice: 38.97,
  },
];

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.css'],
})
export class MyCartComponent implements OnInit {
  products = products;
  constructor() {}

  ngOnInit(): void {}
}
