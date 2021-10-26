const router = require('express').Router();

router.use('/users', require('./users'));

router.use('/auths', require('./auths/index'));

router.use('/signs', require('./signs'));

module.exports = router;
