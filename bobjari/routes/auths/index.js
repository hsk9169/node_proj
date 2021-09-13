const router = require('express').Router();

router.use('/kakao', require('/kakao'));
router.use('/google', require('/google'));
router.use('/apple', require('/apple'));

module.exports = router;
