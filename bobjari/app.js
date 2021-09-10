// ENV
require('dotenv').config();
// Dependencies
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const app = express();

const { PORT, MONGO_URI} = process.env;
const { swaggerUi, specs } = require('./config/swagger');
const logger = require('./config/winston');

//  View HTMLs
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

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
app.use('/tests', require('./routes/tests'));
app.use('/users', require('./routes/users'));
app.use('/auth', require('./routes/auth'));

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.get('/', (req,res,next) => {
    res.render('./index');
});

app.get('/profile', (req,res,next) => {
    console.log(req.query);
    res.render('./profile');
});


app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));