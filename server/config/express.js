const cors = require('cors');
const cookieParser = require('cookie-parser');

const auth = require('../middlewares/auth');
const whitelist = ['http://localhost:4200'];

module.exports = (app, express) => {
  app.use(express.static('public'));
  app.use(cors({ origin: whitelist, credentials: true }));
  app.use(express.json());

  app.use(cookieParser());
  app.use(auth());

  app.use((error, req, res, next) => {
    if (res.headerSent) {
      return next(error);
    }
    res.status(error.code || 500).json({ message: error.message || 'An unknown error occurred!' });
  });
};
