export interface IBaseProduct {
  _id: string;
  name: string;
  description: string;
  image: {
    url: string;
    _id: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ISize {
  size: string;
  pieces: number;
  price: number;
}
export interface IDough {
  dough: string;
  price: number;
}
export interface IIngredient {
  ingredient: string;
}

export interface IExtra {
  extra: string;
  price: number;
}

export interface ICreateProduct {
  name: string;
  image: File;
  description: string;
  sizes: ISize[];
  doughs: IDough[];
  ingredients: IIngredient[];
  extras: IExtra[];
}

export interface IProduct extends IBaseProduct {
  sizes: ISize[];
  doughs: IDough[];
  ingredients: IIngredient[];
  extras: IExtra[];
  rating: number;
  author: string;
}

export interface ICartProduct {
  _id: string;
  uniqueId: null | string;
  name: string;
  imageUrl: string;
  size: ISize;
  dough: IDough;
  extras: IExtra[];
  rating: number;
  gr: number;
  quantity: number;
  price: number;
  totalPrice: number;
}

export interface IFavoriteProduct {
  _id: string;
  name: string;
  imageUrl: string;
  size: ISize;
  dough: IDough;
  rating: number;
  gr: number;
}
