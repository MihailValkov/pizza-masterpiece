function isAuthNeeded(isAuthNeeded = true) {
  return (req, res, next) => {
    const needAuth = !req.user && isAuthNeeded;
    const noNeedAuth = req.user && !isAuthNeeded;
    if (needAuth || noNeedAuth) {
      res.status(403).json({
        message:
          'Accessing the page or resource you were trying to reach is absolutely forbidden for some reason!',
      });
      return;
    }
    next();
  };
}

function isAdmin() {
  return (req, res, next) => {
    if (req?.user?.role !== 'Admin') {
      res.status(403).json({
        message:
          'Accessing the page or resource you were trying to reach is absolutely forbidden for some reason!',
      });
      return;
    }
    next();
  };
}

module.exports = {
  isAuthNeeded,
  isAdmin,
};
