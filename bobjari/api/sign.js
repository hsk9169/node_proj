const router = require('express').Router();
const signController = require('../controllers/sign');
const clientLogger = require('../middlewares/clientLogger');


router.post('/in/kakao', clientLogger.getHostname, signController.signInKakao);

router.post('/in/bob', clientLogger.getHostname, signController.signInBob);

module.exports = router;