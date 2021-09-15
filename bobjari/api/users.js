const router = require('express').Router();
const userController = require('../controllers/user');

// Create new Users document
router.post('/', userController.postUser);

// Find All
router.get('/', userController.getUsers);

// Find One by userid
router.get('/userid/:userid', userController.getUserByUserid);

// Update by userid
router.put('/userid/:userid', userController.putUserByUserid);

// Delete by userid
router.delete('/userid/:userid', userController.deleteUserByUserid);

module.exports = router;