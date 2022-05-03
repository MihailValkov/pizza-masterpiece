const jwt = require('../utils/jwt');
const userModel = require('../models/User');
const { cookie_name } = require('../config/config');
const { errorHandler } = require('../utils/errorHandler');
const { removeObjectFields } = require('../utils/removeSafeData');
const { deleteUserImage } = require('./upload');

const createToken = ({ _id, email, role }) => jwt.create({ _id, email, role });

const authenticate = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);

    return res.status(200).json(removeObjectFields(user.toObject()));
  } catch (error) {
    errorHandler(error, res, req);
  }
};

const login = async (req, res) => {
  const { email, password } = req?.body;
  if (email == '' || password == '') {
    return res.status(400).json({ message: 'All fields are required!' });
  }
  try {
    const user = await userModel.findOne({ email: { $regex: email, $options: 'i' } });
    if (!user) {
      return res.status(409).json({ message: "Email or Password don't match!" });
    }
    const match = await user.comparePasswords(password);
    if (!match) {
      return res.status(409).json({ message: "Email or Password don't match!" });
    }
    const token = createToken(user);

    res
      .cookie(cookie_name, token, { httpOnly: true })
      .status(200)
      .json(removeObjectFields(user.toObject()));
  } catch (error) {
    errorHandler(error, res, req);
  }
};

const register = async (req, res) => {
  const { email, password, repeatPassword } = req?.body;
  if (password.trim() !== repeatPassword.trim()) {
    return res.status(409).json({ message: "Passwords don't match!" });
  }
  try {
    let user = await userModel.findOne({ email: { $regex: email, $options: 'i' } });
    if (user) {
      return res.status(409).json({ message: 'Email is already taken!' });
    }
    user = await userModel.create({ email: email.trim(), password: password.trim() });

    const token = createToken(user.toObject());
    res
      .cookie(cookie_name, token, { httpOnly: true })
      .status(201)
      .json(removeObjectFields(user.toObject()));
  } catch (error) {
    errorHandler(error, res, req);
  }
};

const logout = async (req, res) => {
  req.user = null;
  res
    .status(200)
    .clearCookie(cookie_name, { maxAge: 0, httpOnly: true })
    .json({ message: 'Logout is successful' });
};

const updateUserImage = async (req, res, next) => {
  const userId = req.user._id;
  const image = req.image;
  try {
    const user = await userModel.findByIdAndUpdate(userId, { image });
    if (user.image?._id) {
      await deleteUserImage(user.image?._id);
    }
    res.status(200).json(image);
  } catch (error) {
    errorHandler(error, res, req);
  }
};

const updateUserInfo = async (req, res, next) => {
  const userId = req.user._id;
  const { firstName, lastName, phoneNumber } = req.body;
  try {
    await userModel.findByIdAndUpdate(userId, { firstName, lastName, phoneNumber });
    res.status(200).json({ firstName, lastName, phoneNumber });
  } catch (error) {
    errorHandler(error, res, req);
  }
};

const updateUserAddress = async (req, res, next) => {
  const userId = req.user._id;
  const { country, city, street, streetNumber } = req.body;
  try {
    await userModel.findByIdAndUpdate(userId, { address: { country, city, street, streetNumber } });
    res.status(200).json({ country, city, street, streetNumber });
  } catch (error) {
    errorHandler(error, res, req);
  }
};

const updateUserPassword = async (req, res, next) => {
  const { oldPassword, password, repeatPassword } = req.body;

  if (oldPassword == '' || password == '' || repeatPassword == '') {
    return res.status(400).json({ message: 'All fields are required!' });
  }
  if (password != repeatPassword) {
    return res.status(409).json({ message: "Passwords don't match!" });
  }

  try {
    const user = await userModel.findById(req.user._id);
    const match = await user.comparePasswords(oldPassword);
    if (!match) {
      return res.status(409).json({ message: 'Old Password is not correct! Please try again.' });
    }
    user.password = password;
    await user.save();
    res.status(200).json({ message: 'Password has been changed successfully!' });
  } catch (error) {
    errorHandler(error, res, req);
  }
};

module.exports = {
  login,
  register,
  logout,
  authenticate,
  updateUserImage,
  updateUserInfo,
  updateUserAddress,
  updateUserPassword,
};
