const router = require('express').Router();
const authController = require('../controllers/auth');
const authChecker = require('../middlewares/authChecker');
const clientLogger = require('../middlewares/clientLogger');


router.post('/kakao', 
            authController.authKakao);

router.post('/email', 
            clientLogger.getHostname, 
            authController.authEmail);

router.post('/phone',
            clientLogger.getHostname,
            authController.authPhone)

router.get('/token', 
            clientLogger.getHostname, 
            authController.authToken);

router.get('/verify', 
            [clientLogger.getHostname, authChecker.check], 
            authController.verifyToken);

module.exports = router;