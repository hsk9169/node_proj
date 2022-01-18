const router = require('express').Router();
const authChecker = require('../middlewares/authChecker');
const signController = require('../controllers/sign');
const clientLogger = require('../middlewares/clientLogger');


router.use('/users', require('./users/index'));

router.use('/auths', require('./auths/index'));

router.use('/sign', require('./sign'));

router.get('/test/jwt', [authChecker.check, clientLogger.getHostname], 
            signController.signInTest);

module.exports = router;
