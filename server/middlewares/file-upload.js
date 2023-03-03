const fs = require('fs');
const path = require('path');
const multer = require('multer');
const { globalDir } = require('../index');
const UPLOAD_FOLDER_NAME = 'uploads';

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg',
};

const createUploadFolder = () => {
  const isFolderExist = fs.existsSync(UPLOAD_FOLDER_NAME);
  if (!isFolderExist) {
    fs.mkdirSync(path.join(globalDir, UPLOAD_FOLDER_NAME))
  }
}

const fileUpload = multer({
  limits: 500000,
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      createUploadFolder();
      cb(null, UPLOAD_FOLDER_NAME);
    },
    filename: (req, file, cb) => {
      const ext = MIME_TYPE_MAP[file.mimetype];
      cb(null, new Date() * Math.random() + '.' + ext);
    },
  }),
  fileFilter: (req, file, cb) => {
    const isValid = !!MIME_TYPE_MAP[file.mimetype] && file !== 'null';
    let error = isValid ? null : new Error('Invalid mime type!');
    cb(error, isValid);
  },
});

const uploadSingleImage = fileUpload.single('image');

const single = () => (req, res, next) => {
  uploadSingleImage(req, res, (err) => {
    if (err) {
      return res.status(409).json({ message: err.message });
    }
    next();
  });
};

module.exports = {
  single,
};
