const router = require('express').Router();
const signController = require('../controllers/sign');
const clientLogger = require('../middlewares/clientLogger');


router.post('/kakao', clientLogger.getHostname, signController.signInKakao);

router.post('/bob', clientLogger.getHostname, signController.signInBob);

module.exports = router;