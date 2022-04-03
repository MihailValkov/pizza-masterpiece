import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit {
  products = [
    {
      image: {
        _id: 'pizza-masterpiece/images/products/tcwsqa0g5eulnhl7dpab',
        url: 'https://res.cloudinary.com/dofijitd8/image/upload/v1648756689/pizza-masterpiece/images/products/tcwsqa0g5eulnhl7dpab.jpg',
      },
      _id: '624607d11d89fd5844ea6f1d',
      name: 'Margarita test',
      description: 'my super description',
      createdAt: '2022-03-31T19:58:09.600Z',
      updatedAt: '2022-03-31T19:58:09.600Z',
    },
    {
      image: {
        _id: 'pizza-masterpiece/images/products/tcwsqa0g5eulnhl7dpab',
        url: 'https://res.cloudinary.com/dofijitd8/image/upload/v1648756689/pizza-masterpiece/images/products/tcwsqa0g5eulnhl7dpab.jpg',
      },
      _id: '624607d11d89fd5844ea6f1d',
      name: 'Margarita test',
      description: 'my super description',
      createdAt: '2022-03-31T19:58:09.600Z',
      updatedAt: '2022-03-31T19:58:09.600Z',
    },
    {
      image: {
        _id: 'pizza-masterpiece/images/products/tcwsqa0g5eulnhl7dpab',
        url: 'https://res.cloudinary.com/dofijitd8/image/upload/v1648756689/pizza-masterpiece/images/products/tcwsqa0g5eulnhl7dpab.jpg',
      },
      _id: '624607d11d89fd5844ea6f1d',
      name: 'Margarita test',
      description: 'my super description',
      createdAt: '2022-03-31T19:58:09.600Z',
      updatedAt: '2022-03-31T19:58:09.600Z',
    },
    {
      image: {
        _id: 'pizza-masterpiece/images/products/tcwsqa0g5eulnhl7dpab',
        url: 'https://res.cloudinary.com/dofijitd8/image/upload/v1648756689/pizza-masterpiece/images/products/tcwsqa0g5eulnhl7dpab.jpg',
      },
      _id: '624607d11d89fd5844ea6f1d',
      name: 'Margarita test',
      description: 'my super description',
      createdAt: '2022-03-31T19:58:09.600Z',
      updatedAt: '2022-03-31T19:58:09.600Z',
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
