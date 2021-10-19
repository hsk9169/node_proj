const router = require('express').Router();
const authController = require('../../../controllers/auth');

// Login with Kakao
router.post('/', authController.authKakao);

module.exports = router;