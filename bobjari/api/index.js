const router = require('express').Router();
const authChecker = require('../middlewares/authChecker');
const signController = require('../controllers/sign');
const clientLogger = require('../middlewares/clientLogger');


router.use('/user', require('./user'))

router.use('/mentee', require('./mentee'))

router.use('/mentor', require('./mentor'))

router.use('/auth', require('./auth'))

router.use('/signin', require('./signin'))

router.use('/bobjari', require('./bobjari'))

router.use('/like', require('./like'))

module.exports = router