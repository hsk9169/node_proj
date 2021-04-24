var router = require('express').Router();

router.use('/api', require('./api/'));
router.get('/test', function(req, res) {
    console.log('test');
});

module.exports = router;
