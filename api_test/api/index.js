var express = require('express');
var router = express.Router();

router.use('/users', require('./users'));
router.get('/', 
    function(req, res, next) {
        res.json({
            success: true,
            message: 'index page'});
        console.log('GET /api');
});

module.exports = router;
