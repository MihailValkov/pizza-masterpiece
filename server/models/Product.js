const { Schema, model } = require('mongoose');

const ingredientSchema = new Schema({
  ingredient: {
    type: String,
    minLength: [3, 'Ingredient should be at least 3 characters long'],
  },
});
const ingredientModel = model('Ingredient', ingredientSchema);
const sizeSchema = new Schema({
  size: {
    type: String,
    minLength: [3, 'Size should be at least 3 characters long'],
  },
  pieces: {
    type: Number,
    min: [6, 'Pieces should be minimum 6'],
  },
  price: {
    type: Number,
    minLength: [1, 'Price should be minimum 1'],
  },
});
const sizeModel = model('Size', sizeSchema);
const doughSchema = new Schema({
  dough: {
    type: String,
    minLength: [3, 'Dough should be at least 3 characters long'],
  },
  price: {
    type: Number,
    min: [0, 'Price should be minimum 0'],
  },
});
const doughModel = model('Dough', doughSchema);
const extraSchema = new Schema({
  extra: {
    type: String,
    minLength: [3, 'Extra should be at least 3 characters long'],
  },
  price: {
    type: Number,
    min: [0.5, 'Price should be minimum 0.5'],
  },
});
const extraModel = model('Extra', extraSchema);

const productSchema = new Schema(
  {
    name: {
      type: String,
      minLength: [3, 'Name should be at least 3 characters long'],
    },
    image: {
      _id: { type: String, default: '' },
      url: { type: String, default: '' },
    },
    description: {
      type: String,
      minLength: [10, 'Description should be at least 10 characters long'],
    },
    ingredients: [
      {
        type: Schema.ObjectId,
        ref: 'Ingredient',
        default: [],
      },
    ],
    sizes: [
      {
        type: Schema.ObjectId,
        ref: 'Size',
        default: [],
      },
    ],
    doughs: [
      {
        type: Schema.ObjectId,
        ref: 'Dough',
        default: [],
      },
    ],
    extras: [
      {
        type: Schema.ObjectId,
        ref: 'Extra',
        default: [],
      },
    ],
    rating: {
      type: Number,
      default: 0,
    },
    author: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

const productModel = model('Product', productSchema);

module.exports = {
  productModel,
  ingredientModel,
  extraModel,
  doughModel,
  sizeModel,
};
