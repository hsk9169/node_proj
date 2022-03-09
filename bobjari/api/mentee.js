const router = require('express').Router();
const menteeController = require('../controllers/mentee');
const authChecker = require('../middlewares/authChecker');
const clientLogger = require('../middlewares/clientLogger');


router.get('/',
            [clientLogger.getHostname, authChecker.check],
            menteeController.getMenteeByIdWithMeta)


module.exports = router;