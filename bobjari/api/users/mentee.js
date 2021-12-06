const router = require('express').Router();
const userController = require('../../controllers/user');
const authChecker = require('../../middlewares/authChecker');


// Find All
router.get('/', authChecker.check, userController.getMentees);

router.post('/create', userController.postMentee);

module.exports = router;