const router = require('express').Router();
const authChecker = require('../../middlewares/authChecker');
const userController = require('../../controllers/user');
const clientLogger = require('../../middlewares/clientLogger');


router.use('/mentee', 
            require('./mentee'));
router.use('/mentor', 
            require('./mentor'));

// Create User
router.post('/', 
            clientLogger.getHostname, 
            userController.postUser);

// Check Dupliation of Nickname
router.get('/nickname', 
            clientLogger.getHostname, 
            userController.getUserByNickname);

// Find user by email
router.get('/email', 
            clientLogger.getHostname, 
            userController.getUserByEmailWithDetails);

// Change Role between mentor & mentee
router.get('/change', 
            [clientLogger.getHostname, authChecker.check], 
            userController.changeUserRole)

// Find user by mentee phone
router.post('/phone', 
            clientLogger.getHostname, 
            userController.postUserByPhone);



module.exports = router;
