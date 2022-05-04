const router = require('express').Router();
const controller = require('../controllers/order');
const { isAuthNeeded } = require('../middlewares/authentication');

router.get('/', isAuthNeeded(), controller.getOrders);
router.get('/:orderId', isAuthNeeded(), controller.getOrder);

router.post('/', controller.createOrder);

module.exports = router;
