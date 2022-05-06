const router = require('express').Router();
const controller = require('../controllers/admin');
const { uploadProductImage } = require('../controllers/upload');

const { isAdmin } = require('../middlewares/authentication');
const { single } = require('../middlewares/file-upload');

router.get('/users', isAdmin(), controller.getUsers);
router.get('/users/:id', isAdmin(), controller.getUser);
router.patch('/users/:id', isAdmin(), controller.changeUserSettings);

router.get('/products/:id', isAdmin(), controller.getProductById);

router.post('/products', isAdmin(), single(), uploadProductImage, controller.createProduct);

module.exports = router;
