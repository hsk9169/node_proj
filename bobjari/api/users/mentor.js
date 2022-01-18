const router = require('express').Router();
const userController = require('../../controllers/user');
const authChecker = require('../../middlewares/authChecker');
const clientLogger = require('../../middlewares/clientLogger');


// Find All

router.get('/', clientLogger.getHostname, userController.getMentors);

router.post('/create', clientLogger.getHostname, userController.postMentor);

router.get('/searchAllow', [clientLogger.getHostname, authChecker.check], 
            userController.updateMentorAllowSearch);

module.exports = router;