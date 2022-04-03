const router = require('express').Router();
const controller = require('../controllers/product');

router.get('', controller.getAllProducts);
router.get('/:id', controller.getProductById);

module.exports = router;
