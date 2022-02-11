const router = require('express').Router();
const mentorController = require('../controllers/mentor');
const authChecker = require('../middlewares/authChecker');
const clientLogger = require('../middlewares/clientLogger');


router.get('/email',
            clientLogger.getHostname,
            mentorController.getMentorByEmailWithMeta)

router.get('/search', 
            clientLogger.getHostname, 
            mentorController.getMentorsBySearchKeyword);

module.exports = router;