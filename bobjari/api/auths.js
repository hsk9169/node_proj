const router = require('express').Router();
const authController = require('../controllers/auth');

// Login with Kakao
router.get('/kakao', authController.getAuthKakao);

router.get('/kakao/callback', authController.getKakaoCallback);

router.get('/kakao/callback/profile', authController.getKakaoProfile);

module.exports = router;