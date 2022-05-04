const { productModel } = require('../models/Product');
const { errorHandler } = require('../utils/errorHandler');

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

module.exports = {
  getProductById,
  getAllProducts,
};
