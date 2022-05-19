const {
  productModel,
  ingredientModel,
  sizeModel,
  doughModel,
  extraModel,
} = require('../models/Product');
const { userModel, roles, accountStatuses } = require('../models/User');
const { orderModel, orderStatuses } = require('../models/Order');

const { errorHandler } = require('../utils/errorHandler');

const createProduct = async (req, res) => {
  try {
    let { name, description, sizes, doughs, ingredients, extras } = req?.body;
    sizes = JSON.parse(sizes);
    doughs = JSON.parse(doughs);
    ingredients = JSON.parse(ingredients);
    extras = JSON.parse(extras);

    const createdIngredients = await Promise.all([
      ...ingredients.map((x) => ingredientModel.create(x)),
    ]);
    const createdSizes = await Promise.all([...sizes.map((x) => sizeModel.create(x))]);
    const createdDoughs = await Promise.all([...doughs.map((x) => doughModel.create(x))]);
    const createdExtras = await Promise.all([...extras.map((x) => extraModel.create(x))]);
    const createdProduct = await productModel.create({
      name,
      description,
      sizes: createdSizes,
      doughs: createdDoughs,
      ingredients: createdIngredients,
      extras: createdExtras,
      image: req.image,
      author: req.user._id,
    });

    const product = {
      _id: createdProduct._id,
      name: createdProduct.name,
      image: createdProduct.image,
      rating: createdProduct.rating,
      createdAt: createdProduct.createdAt,
      updatedAt: createdProduct.updatedAt,
    };

    return res.status(200).json({ product });
  } catch (error) {
    errorHandler(error, res, req);
  }
};

const getProducts = async (req, res, next) => {
  const page = parseInt(req?.query?.page);
  const limit = parseInt(req?.query?.limit);
  const sort = req?.query?.sort;
  const order = req?.query?.order;
  const searchValue = req?.query?.searchValue;
  const selectValue = req?.query?.selectValue;
  const skipIndex = (page - 1) * limit;

  let query = {};
  let sortCriteria = {};

  if (sort && order) {
    sortCriteria = { [sort]: order };
  }

  if (searchValue && selectValue) {
    if (selectValue == '_id') {
      query = { [selectValue]: searchValue.trim() };
    } else if (selectValue === 'rating') {
      query = { [selectValue]: { $gte: searchValue } };
    } else {
      query = { [selectValue]: new RegExp(searchValue.trim() || '', 'i') };
    }
  }

  try {
    const count = await productModel.countDocuments(query);
    let products = await productModel
      .find(query)
      .select('name image rating createdAt updatedAt')
      .limit(limit)
      .skip(skipIndex)
      .sort(sortCriteria)
      .lean();

    return res.status(200).json({ products, count });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(200).json({ products: [], count: 0 });
    }
    errorHandler(error, res, req);
  }
};

const getProduct = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await userModel.findById(id, '-__v -password -orders -ratedProducts').lean();

    return res.status(200).json({ user });
  } catch (error) {
    errorHandler(error, res, req);
  }
};

const getUsers = async (req, res, next) => {
  const page = parseInt(req?.query?.page);
  const limit = parseInt(req?.query?.limit);
  const sort = req?.query?.sort;
  const order = req?.query?.order;
  const searchValue = req?.query?.searchValue;
  const selectValue = req?.query?.selectValue;
  const skipIndex = (page - 1) * limit;

  let query = {};
  let sortCriteria = {};

  if (sort && order) {
    sortCriteria = { [sort]: order };
  }

  if (searchValue && selectValue) {
    if (selectValue == '_id') {
      query = { [selectValue]: searchValue.trim() };
    } else if (selectValue === 'ordersCount' || selectValue === 'ratedProductsCount') {
      query = { [selectValue]: { $gte: searchValue } };
    } else {
      query = { [selectValue]: new RegExp(searchValue.trim() || '', 'i') };
    }
  }

  try {
    const count = await userModel.countDocuments(query);
    let users = await userModel
      .find(query)
      .select(
        'email firstName lastName ordersCount ratedProductsCount accountStatus role createdAt'
      )
      .limit(limit)
      .skip(skipIndex)
      .sort(sortCriteria)
      .lean();

    return res.status(200).json({ users, count, roles, accountStatuses });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(200).json({ users: [], count: 0, roles, accountStatuses });
    }

    errorHandler(error, res, req);
  }
};

const getUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await userModel.findById(id, '-__v -password -orders -ratedProducts').lean();

    return res.status(200).json({ user });
  } catch (error) {
    errorHandler(error, res, req);
  }
};

const changeUserSettings = async (req, res, next) => {
  const { id } = req.params;
  const { role, accountStatus } = req.body;

  try {
    const user = await userModel.findByIdAndUpdate(
      id,
      { role, accountStatus },
      { new: true, runValidators: true }
    );

    res.status(200).json({ email: user.email, role, accountStatus });
  } catch (error) {
    errorHandler(error, res, req);
  }
};

const getOrders = async (req, res, next) => {
  const page = parseInt(req?.query?.page);
  const limit = parseInt(req?.query?.limit);
  const sort = req?.query?.sort;
  const order = req?.query?.order;
  const searchValue = req?.query?.searchValue;
  const selectValue = req?.query?.selectValue;
  const skipIndex = (page - 1) * limit;

  let query = {};
  let sortCriteria = {};

  if (sort && order) {
    sortCriteria = { [sort]: order };
  }

  if (searchValue && selectValue) {
    if (selectValue == '_id') {
      query = { [selectValue]: searchValue.trim() };
    } else if (selectValue === 'totalProducts' || selectValue === 'totalPrice') {
      query = { [selectValue]: { $gte: searchValue } };
    } else {
      query = { [selectValue]: new RegExp(searchValue.trim() || '', 'i') };
    }
  }

  try {
    const count = await orderModel.countDocuments(query);
    let orders = await orderModel
      .find(query)
      .select(
        'createdAt status paymentMethod totalPrice totalProducts user.firstName user.lastName user.email'
      )
      .limit(limit)
      .skip(skipIndex)
      .sort(sortCriteria)
      .lean();

    return res.status(200).json({ orders, count, orderStatuses });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(200).json({ orders: [], count: 0, orderStatuses });
    }
    errorHandler(error, res, req);
  }
};

const getOrder = async (req, res, next) => {
  const { id } = req.params;

  try {
    const data = await orderModel
      .findById(id, '-__v')
      .populate({
        path: 'products',
        populate: {
          path: 'productId',
          select: 'image name ingredients',
          populate: {
            path: 'ingredients',
            select: 'ingredient',
          },
        },
      })
      .lean();

    const transformedProducts = data.products.map((product) => {
      const currentProduct = {
        ...product,
        _id: product.productId._id,
        name: product.productId.name,
        imageUrl: product.productId.image.url,
        ingredients: product.productId.ingredients.map((i) => i.ingredient),
      };
      delete currentProduct.productId;
      return currentProduct;
    });

    return res.status(200).json({ order: { ...data, products: transformedProducts } });
  } catch (error) {
    errorHandler(error, res, req);
  }
};

const changeOrderStatus = async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    await orderModel.findByIdAndUpdate(id, { status }, { new: true, runValidators: true });

    res.status(200).json({ status });
  } catch (error) {
    errorHandler(error, res, req);
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  getUsers,
  getUser,
  changeUserSettings,
  getOrders,
  getOrder,
  changeOrderStatus,
};
