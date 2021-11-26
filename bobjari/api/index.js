const router = require('express').Router();
const authChecker = require('../middlewares/authChecker');
const signController = require('../controllers/sign');


router.use('/users', require('./users/index'));

router.use('/auths', require('./auths/index'));

router.use('/sign', require('./sign'));

router.get('/test/jwt', authChecker.check, signController.signInTest);

module.exports = router;
