// ENV
require('dotenv').config();
// Dependencies
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

const { PORT, MONGO_URI} = process.env;
const { swaggerUi, specs } = require('./config/swagger');
const logger = require('./config/winston');

//  View HTMLs
app.set('view engine','ejs'); // 1
app.use(express.static(__dirname + '/public'));

// Static File Services
//app.use(express.static('public'));
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Origin', 'content-type');
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Using native Promise of Node.js
mongoose.Promise = global.Promise;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

// Connect to MongoDB
mongoose
    .connect(MONGO_URI, options)
    .then(() => logger.info('MongoDB connect Success'))
    .catch(e => logger.error(e.stack));

// Routers
//app.use('/users', require('./routes/users'));
//app.use('/auth', require('./routes/auth'));
app.use('/', require('./routes'));

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.get('/login', (req,res,next) => {
    res.render('./index');
});

app.get('/profile', (req,res,next) => {
    res.render('./profile', req.query);
});


app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
