const { productModel } = require('../models/Product');
const { userModel } = require('../models/User');
const { ValidationError } = require('../utils/createValidationError');
const { errorHandler } = require('../utils/errorHandler');

const mapToStatus = {
  1: 'Poor',
  2: 'Fair',
  3: 'Good',
  4: 'Very Good',
  5: 'Excellent',
};

const getAllProducts = async (req, res, next) => {
  const page = parseInt(req?.query?.page);
  const limit = parseInt(req?.query?.limit);
  const skipIndex = (page - 1) * limit;

  try {
    const count = await productModel.countDocuments();
    const products = await productModel
      .find({}, '-sizes -extras -ingredients -doughs -author -__v')
      .limit(limit)
      .skip(skipIndex)
      .lean();

    res.status(200).json({ products, count });
  } catch (error) {
    errorHandler(error, res, req);
  }
};

const getProductById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const product = await productModel
      .findById(id, '-__v -author')
      .populate('sizes extras ingredients doughs', '-__v');
    if (!product) {
      throw new Error('There is no such product with provided ID - ' + id);
    }
    res.status(200).json(product.toObject());
  } catch (error) {
    errorHandler(error, res, req);
  }
};

const rateProduct = async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user._id;
  const { rate, comment } = req.body;

  try {
    const product = await productModel.findById(id);

    if (!product) {
      throw new ValidationError('Product with provided ID is not found', 404);
    }

    if (product.toObject().comments.find((comment) => comment.user == userId)) {
      throw new ValidationError('You have already rated this product!', 403);
    }

    product.comments.push({
      user: userId,
      comment,
      status: mapToStatus[rate],
      rate,
    });
    product.rate[rate]++;
    product.rate.total += rate;
    product.rating = product.rate.total / product.comments.length;

    await product.save();

    const currentUser = await userModel.findById(userId);
    currentUser.ratedProducts.push(id);
    currentUser.ratedProductsCount = currentUser.ratedProducts.length;
    await currentUser.save();

    res.status(200).json({ rating: product.rating });
  } catch (error) {
    errorHandler(error, res, req);
  }
};

module.exports = {
  getProductById,
  getAllProducts,
  rateProduct,
};
