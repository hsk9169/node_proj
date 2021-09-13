const router = require('express').Router();

router.use('/kakao', require('./auth'));

module.exports = router;
