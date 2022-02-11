const router = require('express').Router();
const menteeController = require('../controllers/mentee');
const authChecker = require('../middlewares/authChecker');
const clientLogger = require('../middlewares/clientLogger');


router.get('/email',
            clientLogger.getHostname,
            menteeController.getMenteeByEmailWithMeta)


module.exports = router;