const router = require('express').Router();
const authChecker = require('../middlewares/authChecker');
const chatController = require('../controllers/chat');
const clientLogger = require('../middlewares/clientLogger');

router.get('/',
            [clientLogger.getHostname, authChecker.check],
            chatController.getMessagesByDateWithStep)

module.exports = router;