const { populate } = require('../models/Order');
const orderModel = require('../models/Order');
const { productModel } = require('../models/Product');
const { ValidationError } = require('../utils/createValidationError');
const { errorHandler } = require('../utils/errorHandler');

const createOrder = async (req, res, next) => {
  const { user, products, totalProducts, price, taxes, paymentMethod } = req.body;
  const ids = products.map((p) => p.productId);

  try {
    const existingProducts = await productModel.find({ _id: ids }).lean();
    if (existingProducts?.length === 0) {
      throw new ValidationError('There is no such products with the provided IDs');
    }

    const transformedProducts = products.map((p) => {
      const currentProduct = existingProducts.find((ep) => ep._id == p.productId);

      const sizesIds = currentProduct.sizes.map((id) => id.toString());
      const doughsIds = currentProduct.doughs.map((id) => id.toString());
      const extrasIds = currentProduct.extras.map((id) => id.toString());

      if (!sizesIds.includes(p.selectedSize._id)) {
        throw new ValidationError(
          `Selected size (${p.selectedSize.size}) is not valid for product (${currentProduct.name})`
        );
      }
      if (!doughsIds.includes(p.selectedDough._id)) {
        throw new ValidationError(
          `Selected dough (${p.selectedDough.dough}) is not valid for product (${currentProduct.name})`
        );
      }
      let extra = { isValid: true, extraName: null };
      for (let i = 0; i < p.selectedExtras.length; i++) {
        const currentExtra = p.selectedExtras[i];
        if (!extrasIds.includes(currentExtra._id)) {
          extra = {
            isValid: false,
            extraName: currentExtra.extra,
          };
          break;
        }
      }
      if (!extra.isValid) {
        throw new ValidationError(
          `Selected extra (${extra.extraName}) is not valid for product (${currentProduct.name})`
        );
      }
      return {
        ...p,
        selectedSize: p.selectedSize.size,
        selectedDough: p.selectedDough.dough,
        selectedExtras: p.selectedExtras.map((e) => e.extra),
      };
    });

    const newOrder = await orderModel.create({
      user,
      paymentMethod,
      taxes,
      price,
      totalProducts,
      products: transformedProducts,
    });

    res.status(201).json({ order: newOrder.toObject() });
  } catch (error) {
    errorHandler(error, res, req);
  }
};

const getOrders = async (req, res, next) => {
  const page = parseInt(req?.query?.page);
  const limit = parseInt(req?.query?.limit);
  const sort = req?.query?.sort;
  const order = req?.query?.order;
  const skipIndex = (page - 1) * limit;
  try {
    const count = await orderModel.countDocuments();
    const ordersList = await orderModel
      .find({ 'user.email': req.user.email })
      .limit(limit)
      .skip(skipIndex)
      .sort({ [sort]: order })
      .lean();

    return res.status(200).json({ ordersList, count });
  } catch (error) {
    errorHandler(error, res, req);
  }
};

const getOrder = async (req, res, next) => {
  const { orderId } = req.params;
  try {
    const data = await orderModel
      .findOne({ _id: orderId, 'user.email': req.user.email }, '-updatedAt -__v')
      .populate({
        path: 'products',
        populate: {
          path: 'productId',
          select: 'description image name ingredients rating',
          populate: {
            path: 'ingredients',
            select: 'ingredient',
          },
        },
      })
      // .populate('products.productId', 'description image ingredients name rating')
      .lean();
    const transformedProducts = data.products.map((product) => {
      const currentProduct = {
        ...product,
        name: product.productId.name,
        description: product.productId.description,
        imageUrl: product.productId.image.url,
        ingredients: product.productId.ingredients.map((i) => i.ingredient),
      };
      delete currentProduct.productId;
      return currentProduct;
    });
    const order = {
      ...data,
      products: transformedProducts,
    };
    return res.status(200).json(order);
  } catch (error) {
    errorHandler(error, res, req);
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrder,
};
