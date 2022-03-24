const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const cloudinaryUploadImage = async (path, location) =>
  await cloudinary.uploader.upload(path, {
    upload_preset: location,
  });
const cloudinaryDeleteImage = async (id) => {
  return await cloudinary.api.delete_resources([id], (error, result) => {
    if (error) {
      throw new Error('Provided public_id is not correct!');
    }
    return result;
  });
};

module.exports = { cloudinary, cloudinaryDeleteImage, cloudinaryUploadImage };
