const router = require('express').Router();

router.get('/', () => console.log('/'));
router.use('/users', require('./users'));
router.use('/auths', require('./auths'));

module.exports = router;
