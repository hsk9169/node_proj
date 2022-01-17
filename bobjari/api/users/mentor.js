const router = require('express').Router();
const userController = require('../../controllers/user');
const authChecker = require('../../middlewares/authChecker');


// Find All

router.get('/', userController.getMentors);

router.post('/create', userController.postMentor);

router.get('/searchAllow', authChecker.check, userController.updateMentorAllowSearch);

module.exports = router;