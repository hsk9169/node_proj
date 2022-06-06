const router = require('express').Router();
const autocompleteController = require('../controllers/autocomplete');
const authChecker = require('../middlewares/authChecker');
const clientLogger = require('../middlewares/clientLogger');


router.post('/job', 
            clientLogger.getHostname, 
            autocompleteController.addJobToList);

router.post('/corp', 
            clientLogger.getHostname, 
            autocompleteController.addCorpToList);

router.get('/job',
            clientLogger.getHostname,
            autocompleteController.getJobList)

router.get('/corp', 
            clientLogger.getHostname, 
            autocompleteController.getCorpList);

module.exports = router;