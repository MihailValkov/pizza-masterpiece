const userRouter = require('./user.js');
const adminRouter = require('./admin.js');
const uploadRouter = require('./upload.js');

module.exports = (app) => {
  app.use('/api/auth', userRouter);
  app.use('/api/admin', adminRouter);
  app.use('/api/uploads', uploadRouter);
};
