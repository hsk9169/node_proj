var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
const { Client } = require('pg');



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Origin', 'content-type');
    next();
});

app.use('/api', require('./api/index'));

app.get('/', 
    function(req, res, next) {
        res.json({
            success: true,
            message: 'Hello from Node.js server'});
        console.log('GET root route');
});

var port = 3000;
app.listen(port, function() {
    console.log('listening on port:' + port);
});
