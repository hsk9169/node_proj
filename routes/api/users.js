var router   = require('express').Router();
var passport = require('passport');
var Users    = require('../../models/getUsers');
var router   = require('express').Router();
var auth     = require('../auth');

router.get('/', function(req, res) {
    console.log('getUsers route');
});

module.exports = router;
