const router = require('express').Router();
const authController = require('../../controllers/auth');

router.post('/email', authController.authEmail);

router.get('/token', authController.authToken);

module.exports = router;