const {
  productModel,
  ingredientModel,
  sizeModel,
  doughModel,
  extraModel,
} = require('../models/Product');
const { errorHandler } = require('../utils/errorHandler');

const createProduct = async (req, res) => {
  try {
    let { name, description, sizes, doughs, ingredients, extras } = req?.body;
    sizes = JSON.parse(sizes);
    doughs = JSON.parse(doughs);
    ingredients = JSON.parse(ingredients);
    extras = JSON.parse(extras);

    try {
      const createdIngredients = await Promise.all([
        ...ingredients.map((x) => ingredientModel.create(x)),
      ]);
      const createdSizes = await Promise.all([...sizes.map((x) => sizeModel.create(x))]);
      const createdDoughs = await Promise.all([...doughs.map((x) => doughModel.create(x))]);
      const createdExtras = await Promise.all([...extras.map((x) => extraModel.create(x))]);
      const product = await productModel.create({
        name,
        description,
        sizes: createdSizes,
        doughs: createdDoughs,
        ingredients: createdIngredients,
        extras: createdExtras,
        image: req.image,
        author: req.user._id,
      });
      return res.status(200).json({ product: product.toObject() });
    } catch (error) {
      errorHandler(error, res, req);
    }
  } catch (error) {
    errorHandler(error, res, req);
  }
};

module.exports = {
  createProduct,
};
