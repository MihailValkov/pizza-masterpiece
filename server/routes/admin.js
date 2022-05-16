const router = require('express').Router();
const controller = require('../controllers/admin');
const { uploadProductImage } = require('../controllers/upload');
const { single } = require('../middlewares/file-upload');

router.get('/users', controller.getUsers);
router.get('/users/:id', controller.getUser);

router.get('/orders', controller.getOrders);
router.get('/orders/:id', controller.getOrder);

router.get('/products/:id', controller.getProductById);

router.patch('/users/:id', controller.changeUserSettings);
router.patch('/orders/:id', controller.changeOrderStatus);

router.post('/products', single(), uploadProductImage, controller.createProduct);

module.exports = router;
