const router = require('express').Router();
const authController = require('../../controllers/auth');
const authMiddleware = require('../../middlewares/auth');

router.use('/kakao', require('./kakao/auths'));

// Check Session by useremail
router.get('/check', authController.checkSession);
router.use('/check', authMiddleware.checkJwt);

module.exports = router;
