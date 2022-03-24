const multer = require('multer');

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg',
};

const fileUpload = multer({
  limits: 500000,
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
      const ext = MIME_TYPE_MAP[file.mimetype];
      cb(null, new Date() * Math.random() + '.' + ext);
    },
  }),
  fileFilter: (req, file, cb) => {
    const isValid = !!MIME_TYPE_MAP[file.mimetype];
    let error = isValid ? null : new Error('Invalid mime type!');
    cb(error, isValid);
  },
});

const uploadSingleImage = fileUpload.single('image');
const uploadMultipleImages = fileUpload.array('images', 5);

function single() {
  return (req, res, next) => {
    uploadSingleImage(req, res, (err) => {
      if (err) {
        return res.status(409).json({ message: err.message });
      }
      next();
    });
  };
}
function multiple() {
  return (req, res, next) => {
    uploadMultipleImages(req, res, (err) => {
      if (err) {
        return res.status(409).json({ message: err.message });
      }
      next();
    });
  };
}

module.exports = {
  single,
  multiple,
};
