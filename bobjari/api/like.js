const router = require('express').Router();
const authChecker = require('../middlewares/authChecker');
const likeController = require('../controllers/like');
const clientLogger = require('../middlewares/clientLogger');

router.post('/',
            [clientLogger.getHostname, authChecker.check],
            likeController.createLike)

router.get('/',
            [clientLogger.getHostname, authChecker.check],
            likeController.getLikeByMenteeId)

router.delete('/',
            [clientLogger.getHostname, authChecker.check],
            likeController.deleteLike)

module.exports = router