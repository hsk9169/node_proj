const router = require('express').Router();
const userController = require('../controllers/user');

// Create new Users document
router.post('/', userController.postUser);

// Find All
router.get('/', userController.getUsers);
/*
// Find One by userid
router.get('/userid/:userid', userController.getUserByUserid);

// Update by userid
router.put('/userid/:userid', userController.putUserByUserid);

// Delete by userid
router.delete('/userid/:userid', userController.deleteUserByUserid);
*/
// Find One by user email
router.get('/email', userController.getUserByUserEmail);

// Find One by user nickname
router.get('/nickname', userController.getUserByUserNickname);

module.exports = router;