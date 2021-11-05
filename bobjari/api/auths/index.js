const router = require('express').Router();
const authController = require('../../controllers/auth');

router.post('/kakao', authController.authKakao);

router.post('/email', authController.authEmail);

router.post('/token', authController.authToken);

module.exports = router;