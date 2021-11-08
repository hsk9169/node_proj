const router = require('express').Router();
const userController = require('../controllers/user');
const authChecker = require('../middlewares/authChecker');


// Find All
router.get('/', authChecker.check, userController.getUsers);

router.post('/create', userController.postUser);

// Find One by user email
router.get('/email', userController.getUserByEmail);

// Find One by user phone number
router.post('/phone', userController.postUserByPhone);

// Find One by user nickname
router.post('/nickname', userController.postUserByNickname);

module.exports = router;