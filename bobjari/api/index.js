const router = require('express').Router();
const authChecker = require('../middlewares/authChecker');
const signController = require('../controllers/sign');


router.use('/users', require('./users'));

router.use('/auths', require('./auths/index'));

router.use('/sign', require('./sign'));

router.post('/test/jwt', authChecker.check, signController.signInTest);

module.exports = router;
