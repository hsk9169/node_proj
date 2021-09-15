const router = require('express').Router();

router.get('/', () => console.log('/'));
router.use('/auth', require('./auths/index'));
router.use('/users', require('./users'));

module.exports = router;
