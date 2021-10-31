const router = require('express').Router();
const authChecker = require('../../middlewares/authChecker');
const authController = require('../../controllers/auth');

router.post('/kakao', authController.authKakao);

router.post('/email', authController.authEmail);

router.get('/token', authController.authToken);

module.exports = router;