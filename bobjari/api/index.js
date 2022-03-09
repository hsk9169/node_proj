const router = require('express').Router();


router.use('/user', require('./user'))

router.use('/mentee', require('./mentee'))

router.use('/mentor', require('./mentor'))

router.use('/auth', require('./auth'))

router.use('/signin', require('./signin'))

router.use('/bobjari', require('./bobjari'))

router.use('/chat', require('./chat'))

router.use('/like', require('./like'))

router.use('/review', require('./review'))

module.exports = router