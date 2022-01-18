const router = require('express').Router();
const authChecker = require('../../middlewares/authChecker');
const signController = require('../../controllers/sign');
const userController = require('../../controllers/user');


router.use('/mentee', require('./mentee.js'));

router.use('/mentor', require('./mentor.js'));

// Find user by mentee email
router.get('/email', userController.getUserByEmail);

// Change Role between mentor & mentee
router.get('/change', authChecker.check, userController.changeUserRole)

// Find user by mentee phone
router.post('/phone', userController.postUserByPhone);

// Find user by mentee nickname
router.post('/nickname', userController.postUserByNickname);

module.exports = router;
