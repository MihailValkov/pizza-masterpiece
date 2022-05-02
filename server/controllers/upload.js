const { errorHandler } = require('../utils/errorHandler');
const { cloudinaryUploadImage, cloudinaryDeleteImage } = require('../utils/cloudinary');

// const uploadProductImage = async (req, res, next) => {
//   const path = req?.file?.path;
//   try {
//     const response = await cloudinaryUploadImage(path, 'pizza-masterpiece-products');
//     req.image = { _id: response.public_id, url: response.secure_url };
//     next();
//   } catch (error) {
//     errorHandler(error, res, req);
//   }
// };

const uploadImage = (location) => {
  return async (req, res, next) => {
    const path = req?.file?.path;
    try {
      const response = await cloudinaryUploadImage(path, location);
      req.image = { _id: response.public_id, url: response.secure_url };
      next();
    } catch (error) {
      errorHandler(error, res, req);
    }
  };
};

const uploadProductImage = uploadImage('pizza-masterpiece-products');
const uploadUserImage = uploadImage('pizza-masterpiece-users');

const deleteImage = (location) => {
  return async id => await cloudinaryDeleteImage(`${location}/${id}`);
};

const deleteProductImage = deleteImage('pizza-masterpiece/images/products');
const deleteUserImage = deleteImage('pizza-masterpiece/images/users');

module.exports = {
  uploadProductImage,
  uploadUserImage,
  deleteProductImage,
  deleteUserImage,
};
