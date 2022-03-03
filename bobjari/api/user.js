const router = require('express').Router();
const authChecker = require('../middlewares/authChecker');
const userController = require('../controllers/user');
const clientLogger = require('../middlewares/clientLogger');


// Create User
router.post('/', 
            clientLogger.getHostname, 
            userController.postUser);

// Check Dupliation of Nickname
router.get('/nickname', 
            clientLogger.getHostname,
            userController.getUserByNickname);

// Change Role between Mentor & Mentee
router.get('/change', 
            [clientLogger.getHostname, authChecker.check], 
            userController.changeUserRoleById)


module.exports = router;
