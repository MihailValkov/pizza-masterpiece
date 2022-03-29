const { errorHandler } = require('../utils/errorHandler');
const { cloudinaryUploadImage, cloudinaryDeleteImage } = require('../utils/cloudinary');

const uploadProductImage = async (req, res, next) => {
  const path = req?.file?.path;
  try {
    const response = await cloudinaryUploadImage(path, 'pizza-masterpiece-products');
    req.image = { _id: response.public_id, url: response.secure_url };
    next();
  } catch (error) {
    errorHandler(error, res, req, );
  }
};

const deleteProductImage = async (req, res) => {
  const { id } = req.params;
  try {
    await cloudinaryDeleteImage(`pizza-masterpiece/images/products/${id}`);
  } catch (error) {
    errorHandler(error, res, req);
  }
};

module.exports = {
  uploadProductImage,
  deleteProductImage,
};
