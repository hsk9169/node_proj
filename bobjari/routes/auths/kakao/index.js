const router = require('express').Router();

router.get('/', () => console.log('/auth/kakao'));
router.use('/', require('./auth'));

module.exports = router;