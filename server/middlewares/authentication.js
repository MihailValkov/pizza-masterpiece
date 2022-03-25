const isAuthNeeded =
  (authRequired = true) =>
  (req, res, next) => {
    if ((!req.user && authRequired) || (req.user && !authRequired)) {
      res.status(403).json({
        message: 'Accessing the page or resource you were trying to reach is absolutely forbidden!',
      });
      return;
    }
    next();
  };

const isAdmin = () => (req, res, next) => {
  if (req?.user?.role !== 'Admin') {
    res.status(403).json({
      message: 'Accessing the page or resource you were trying to reach is absolutely forbidden!',
    });
    return;
  }
  next();
};

module.exports = {
  isAuthNeeded,
  isAdmin,
};
