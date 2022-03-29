const router = require('express').Router();
const controller = require('../controllers/admin');
const { uploadProductImage } = require('../controllers/upload');

const { isAdmin } = require('../middlewares/authentication');
const { single } = require('../middlewares/file-upload');

router.post('/products', isAdmin(), single(), uploadProductImage, controller.createProduct);

module.exports = router;