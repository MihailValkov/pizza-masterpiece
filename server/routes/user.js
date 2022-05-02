const router = require('express').Router();
const controller = require('../controllers/user');

const { isAuthNeeded } = require('../middlewares/authentication');
const { uploadUserImage } = require('../controllers/upload');
const { single } = require('../middlewares/file-upload');

router.post('/login', isAuthNeeded(false), controller.login);
router.post('/register', isAuthNeeded(false), controller.register);
router.post('/logout', isAuthNeeded(), controller.logout);
router.patch(
  '/update-user-image',
  isAuthNeeded(),
  single(),
  uploadUserImage,
  controller.updateUserImage
);

router.get('/authenticate', isAuthNeeded(), controller.authenticate);

module.exports = router;
