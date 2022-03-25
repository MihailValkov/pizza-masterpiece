const userRouter = require('./user.js');
const uploadRouter = require('./upload.js');

module.exports = (app) => {
  app.use('/api/auth', userRouter);
  app.use('/api/uploads', uploadRouter);
};
