const userRouter = require('./user.js');
const adminRouter = require('./admin.js');
const productRouter = require('./product.js');
const orderRouter = require('./order.js');
const uploadRouter = require('./upload.js');

const { isAdmin } = require('../middlewares/authentication');

module.exports = (app) => {
  app.use('/api/auth', userRouter);
  app.use('/api/admin', isAdmin(), adminRouter);
  app.use('/api/uploads', uploadRouter);
  app.use('/api/products', productRouter);
  app.use('/api/orders', orderRouter);
};
