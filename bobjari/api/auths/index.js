const router = require('express').Router();

router.use('/kakao', require('./auths'));

module.exports = router;
