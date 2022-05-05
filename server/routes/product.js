const router = require('express').Router();
const controller = require('../controllers/product');
const { isAuthNeeded } = require('../middlewares/authentication');

router.get('', controller.getAllProducts);
router.get('/:id', controller.getProductById);

router.patch('/rate/:id', isAuthNeeded(), controller.rateProduct);

module.exports = router;
