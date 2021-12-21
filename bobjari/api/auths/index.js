const router = require('express').Router();
const authController = require('../../controllers/auth');
const authChecker = require('../../middlewares/authChecker');


router.post('/kakao', authController.authKakao);

router.post('/email', authController.authEmail);

router.get('/token', authController.authToken);

router.get('/verify', authChecker.check, authController.verifyToken);

module.exports = router;