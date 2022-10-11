const router = require('express').Router();
const fcmController = require('../controllers/fcm');
const authChecker = require('../middlewares/authChecker');
const clientLogger = require('../middlewares/clientLogger');


router.post('/message', 
            fcmController.sendMessage);

module.exports = router;