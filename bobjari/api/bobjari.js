const router = require('express').Router();
const authChecker = require('../middlewares/authChecker');
const bobjariController = require('../controllers/bobjari');
const clientLogger = require('../middlewares/clientLogger');

router.post('/',
            clientLogger.getHostname,
            bobjariController.createBobjari)

router.delete('/',
            clientLogger.getHostname,
            bobjariController.removeBobjariById)

router.get('/mentee',
            clientLogger.getHostname,
            bobjariController.getSentBobjariList)

router.get('/mentor',
            clientLogger.getHostname,
            bobjariController.getReceivedBobjari)

router.post('/level',
            clientLogger.getHostname,
            bobjariController.updateBobjariLevel)

module.exports = router;