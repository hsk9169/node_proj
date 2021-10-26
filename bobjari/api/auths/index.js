const router = require('express').Router();
const authChecker = require('../../middlewares/authChecker');
const authController = require('../../controllers/auth');

router.use('/kakao', require('./kakao/auths'));

router.get('/token', authController.authToken);

module.exports = router;