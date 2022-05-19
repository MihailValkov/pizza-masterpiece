const { orderModel } = require('../models/Order');
const { productModel } = require('../models/Product');
const { userModel } = require('../models/User');
const { ValidationError } = require('../utils/createValidationError');
const { errorHandler } = require('../utils/errorHandler');

const createOrder = async (req, res, next) => {
  const userId = req?.user?._id;
  const { user, products, totalProducts, totalPrice, price, deliveryPrice, paymentMethod } =
    req.body;
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
      user: {
        ...user,
        _id: userId ? userId : `${user.firstName}-${user.email}`,
      },
      paymentMethod,
      deliveryPrice,
      price,
      totalPrice,
      totalProducts,
      products: transformedProducts,
    });

    if (userId) {
      const currentUser = await userModel.findById(userId);
      currentUser.orders.push(newOrder);
      currentUser.ordersCount = currentUser.orders.length;
      await currentUser.save();
    }

    res.status(201).json({ orderId: newOrder._id });
  } catch (error) {
    errorHandler(error, res, req);
  }
};

const getOrders = async (req, res, next) => {
  const page = parseInt(req?.query?.page) || 1;
  const limit = parseInt(req?.query?.limit) || 8;
  const sort = req?.query?.sort;
  const order = req?.query?.order;
  const skipIndex = (page - 1) * limit;

  let sortCriteria = {};

  if (sort && order) {
    sortCriteria = { [sort]: order };
  }

  try {
    const count = await orderModel.countDocuments({ 'user._id': req.user._id });
    const ordersList = await orderModel
      .find({ 'user._id': req.user._id })
      .select('status paymentMethod createdAt totalProducts totalPrice')
      .limit(limit)
      .skip(skipIndex)
      .sort(sortCriteria)
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
          select: 'name image',
        },
      })
      .lean();

    const transformedProducts = data.products.map((product) => {
      return {
        _id: product._id,
        productId: product.productId._id,
        name: product.productId.name,
        imageUrl: product.productId.image.url,
        weight: product.weight,
        quantity: product.quantity,
        price: product.price,
        totalPrice: product.totalPrice,
      };
    });

    return res.status(200).json({ order: { ...data, products: transformedProducts } });
  } catch (error) {
    errorHandler(error, res, req);
  }
};

const getOrderProduct = async (req, res, next) => {
  const { orderId, productId } = req.params;
  try {
    const data = await orderModel
      .findOne({
        _id: orderId,
        'user.email': req.user.email,
      })
      .populate({
        path: 'products',
        populate: {
          path: 'productId',
          select: 'description image name ingredients rating rate comments',
          populate: {
            path: 'ingredients',
            select: 'ingredient',
          },
        },
      })
      .lean();

    const existingProduct = data.products.find((p) => p._id.toString() === productId);
    if (!existingProduct) {
      throw new ValidationError('Product with provided ID is not found!');
    }

    const rates = Object.values(existingProduct.productId.rate)
      .map((v) => (v / existingProduct.productId.comments.length) * 100 || 0)
      .slice(0, 5);

    const currentProduct = {
      ...existingProduct,
      rates,
      _id: existingProduct._id,
      name: existingProduct.productId.name,
      description: existingProduct.productId.description,
      imageUrl: existingProduct.productId.image.url,
      ingredients: existingProduct.productId.ingredients.map((i) => i.ingredient),
      rating: existingProduct.productId.rating,
      productId: existingProduct.productId._id,
    };

    return res.status(200).json({ product: currentProduct });
  } catch (error) {
    errorHandler(error, res, req);
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrder,
  getOrderProduct,
};
