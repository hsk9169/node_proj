// ENV
require('dotenv').config();
// DEPENDENCIES
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

const { PORT, MONGO_URI} = process.env;

// Static File Services
//app.use(express.static('public'));
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Origin', 'content-type');
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Using native Promise of Node.js
mongoose.Promise = global.Promise;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

// Connect to MongoDB
mongoose
    .connect(MONGO_URI, options)
    .then(() => console.log('MongoDB connect Success'))
    .catch(e => console.error(e));

// ROUTERS
app.use('/todos', require('./routes/todos'));

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
