const router = require('express').Router();
const authChecker = require('../middlewares/authChecker');
const reviewController = require('../controllers/review');
const clientLogger = require('../middlewares/clientLogger');

router.post('/',
            [clientLogger.getHostname, authChecker.check],
            reviewController.createReview)

router.get('/recent',
            clientLogger.getHostname,
            reviewController.getRecentReviews)


module.exports = router;