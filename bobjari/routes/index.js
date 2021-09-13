const router = require('express').Router();

router.use('/auth', require('./auths/index'));
router.use('/users', require('./users'));

module.exports = router;
