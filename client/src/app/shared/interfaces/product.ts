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
  author: string;
}
