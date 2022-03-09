const router = require('express').Router();
const authChecker = require('../middlewares/authChecker');
const bobjariController = require('../controllers/bobjari');
const clientLogger = require('../middlewares/clientLogger');

router.post('/',
            [clientLogger.getHostname, authChecker.check],
            bobjariController.createBobjari)

router.delete('/',
            [clientLogger.getHostname, authChecker.check],
            bobjariController.removeBobjariById)

router.get('/mentee',
            [clientLogger.getHostname, authChecker.check],
            bobjariController.getSentBobjariList)

router.get('/mentor',
            clientLogger.getHostname,
            bobjariController.getReceivedBobjari)

router.post('/level',
            [clientLogger.getHostname, authChecker.check],
            bobjariController.updateBobjariLevel)

module.exports = router;