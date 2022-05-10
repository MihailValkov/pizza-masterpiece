const {
  productModel,
  ingredientModel,
  sizeModel,
  doughModel,
  extraModel,
} = require('../models/Product');
const { userModel, roles } = require('../models/User');
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
    return res.status(200).json(product.toObject());
  } catch (error) {
    errorHandler(error, res, req);
  }
};

const getProductById = async (req, res, next) => {
  const { id } = req.params;

  res.status(200).json({ _id: 'test' });
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
  let sortCriteria = { [sort]: order };

  if (searchValue && selectValue) {
    if (selectValue == '_id') {
      query = { [selectValue]: searchValue.trim() };
    } else {
      query = { [selectValue]: new RegExp(searchValue.trim() || '', 'i') };
    }
  }

  try {
    const count = await userModel.countDocuments(query);
    let users = await userModel.find(query).limit(limit).skip(skipIndex).sort(sortCriteria).lean();

    return res.status(200).json({ users, count, roles });
  } catch (error) {
    errorHandler(error, res, req);
  }
};

const getUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await userModel.findById(id).lean();

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
  let sortCriteria = { [sort]: order };

  if (searchValue && selectValue) {
    if (selectValue == '_id') {
      query = { [selectValue]: searchValue.trim() };
    } else {
      query = { [selectValue]: new RegExp(searchValue.trim() || '', 'i') };
    }
  }

  try {
    const count = await orderModel.countDocuments(query);
    let orders = await orderModel
      .find(query)
      .limit(limit)
      .skip(skipIndex)
      .sort(sortCriteria)
      .lean();

    return res.status(200).json({ orders, count, orderStatuses });
  } catch (error) {
    errorHandler(error, res, req);
  }
};

const getOrder = async (req, res, next) => {
  const { id } = req.params;

  try {
    const order = await orderModel.findById(id).lean();

    return res.status(200).json({ order });
  } catch (error) {
    errorHandler(error, res, req);
  }
};

module.exports = {
  createProduct,
  getProductById,
  getUsers,
  getUser,
  changeUserSettings,
  getOrders,
  getOrder,
};
