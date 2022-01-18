const router = require('express').Router();
const authChecker = require('../../middlewares/authChecker');
const userController = require('../../controllers/user');
const clientLogger = require('../../middlewares/clientLogger');


router.use('/mentee', require('./mentee.js'));

router.use('/mentor', require('./mentor.js'));

// Find user by mentee email
router.get('/email', clientLogger.getHostname, userController.getUserByEmail);

// Change Role between mentor & mentee
router.get('/change', [clientLogger.getHostname, authChecker.check], 
            userController.changeUserRole)

// Find user by mentee phone
router.post('/phone', clientLogger.getHostname, userController.postUserByPhone);

// Find user by mentee nickname
router.post('/nickname', clientLogger.getHostname, userController.postUserByNickname);

module.exports = router;
