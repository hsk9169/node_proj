const router = require('express').Router();
const userController = require('../controllers/user');

// Find All
router.get('/', userController.getUsers);

router.post('/create', userController.postUser);

// Find One by user email
router.get('/email', userController.getUserByEmail);

// Find One by user phone number
router.get('/phone', userController.getUserByPhone);

// Find One by user nickname
router.get('/nickname', userController.getUserByNickname);

module.exports = router;