const router = require('express').Router();
const authController = require('../../../controllers/auth');

// Login with Kakao
router.get('/', authController.getAuthKakao);

router.get('/callback', authController.getKakaoCallback);

router.get('/callback/profile', authController.getKakaoProfile);

module.exports = router;