const router = require('express').Router();
const signController = require('../controllers/sign');

router.post('/in/kakao', signController.signInKakao);

router.post('/in/bob', signController.signInBob);

module.exports = router;