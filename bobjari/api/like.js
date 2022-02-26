const router = require('express').Router();
const authChecker = require('../middlewares/authChecker');
const likeController = require('../controllers/like');
const clientLogger = require('../middlewares/clientLogger');

router.post('/',
            [clientLogger.getHostname, authChecker.check],
            likeController.addLikeInList)

router.get('/list',
            [clientLogger.getHostname, authChecker.check],
            likeController.getLikeList)

module.exports = router