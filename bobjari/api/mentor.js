const router = require('express').Router();
const mentorController = require('../controllers/mentor');
const authChecker = require('../middlewares/authChecker');
const clientLogger = require('../middlewares/clientLogger');


router.get('/',
            clientLogger.getHostname,
            mentorController.getMentorByIdWithDetails)

router.get('/search', 
            clientLogger.getHostname, 
            mentorController.getMentorsBySearchKeyword);

// Toggle Search Allow
router.get('/searchAllow', 
            [clientLogger.getHostname, authChecker.check], 
            mentorController.toggleMentorSearchAllowById);

module.exports = router;