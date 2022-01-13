const router = require('express').Router();
const userController = require('../../controllers/user');
const authChecker = require('../../middlewares/authChecker');


// Find All

router.get('/', authChecker.check, userController.getMentors);

router.post('/create', userController.postMentor);

router.post('/update', userController.updateMentor);

module.exports = router;