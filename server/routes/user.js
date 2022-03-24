const router = require('express').Router();
const controller = require('../controllers/user');

const { isAuthNeeded } = require('../middlewares/authentication');

router.post('/login', isAuthNeeded(false), controller.login);
router.post('/register', isAuthNeeded(false), controller.register);
router.post('/logout', isAuthNeeded(), controller.logout);

router.get('/authenticate', isAuthNeeded(), controller.authenticate);

module.exports = router;
