const router = require('express').Router();
const controller = require('../controllers/upload');
const { single } = require('../middlewares/file-upload');

router.post('/products', single(), controller.uploadProductImage);

router.delete('/products/:id', controller.deleteProductImage);

module.exports = router;
