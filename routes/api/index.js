var router = require('express').Router();

router.use('/users', require('./users'));
router.use('/profiles', require('./profiles'));
router.use('/articles', require('./articles'));
router.use('/reviews', require('./reviews'));

router.use(function(err, req, res, next) {
    if(err.name === 'ValidationError') {
        console.log('API error');
        return res.status(422).json({
            errors: Object.keys(err.errors).reduce(function(errors, key) {
                errors[key] = err.errors[key].message;

                return errors;
            }, {})
        });
    }

    return next(err);
});

module.exports = router;
