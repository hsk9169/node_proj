const router = require('express').Router();
const authController = require('../../controllers/auth');
const authMiddleware = require('../../middlewares/auth');

router.use('/kakao', require('./kakao/auths'));

// Check Session by useremail
router.get('/session', authController.checkSession);

router.use('/jwt', authMiddleware.checkJwt);

module.exports = router;