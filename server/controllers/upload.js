const { errorHandler } = require('../utils/errorHandler');
const { cloudinaryUploadImage, cloudinaryDeleteImage } = require('../utils/cloudinary');

const uploadProductImage = async (req, res) => {
  const path = req.file.path;
  console.log(path);
  try {
    const response = await cloudinaryUploadImage(path, 'pizza-masterpiece-products');

    res.status(200).json({ _id: response.public_id, url: response.secure_url });
  } catch (error) {
    errorHandler(error, res, req);
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
  deleteProductImage
};
