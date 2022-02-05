const router = require('express').Router();
const userController = require('../../controllers/user');
const authChecker = require('../../middlewares/authChecker');
const clientLogger = require('../../middlewares/clientLogger');

// Find All
router.get('/', [clientLogger.getHostname, authChecker.check], 
            userController.getMentees);

module.exports = router;