const router = require('express').Router();
const authController = require('../../controllers/auth');
const authMiddleware = requrie('../middlewares/auth');

// Login with Kakao
router.get('/', authController.getAuthKakao);

router.get('/callback', authController.getKakaoCallback);

router.get('/callback/profile', authController.getKakaoProfile);

// Check Session by useremail
router.get('/check/:email', authController.checkSession);
router.use('/check', authMiddleware);

module.exports = router;