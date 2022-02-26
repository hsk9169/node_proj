// Dependencies
const express = require('express');
const http = require('http')
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const socket_server = http.createServer(app)
const io = require('socket.io')(socket_server, {
    cors: { 
        origin: [
            'http://ec2-3-131-93-42.us-east-2.compute.amazonaws.com:80',
            'http://3.131.93.42',
            'http://localhost:3000',
            'http://localhost:5000'
        ],
        credentials: true,
    },
})

// App Configurations
const config = require('./config/index');

// Swagger API
const { swaggerUi, specs } = require('./config/swagger');

const parser = bodyParser.urlencoded({extended: false});

// Log Plugin
const logger = require('./config/winston');

// CORS 
app.use(cors({
    origin: [
        'http://ec2-3-131-93-42.us-east-2.compute.amazonaws.com:80',
        'http://3.131.93.42',
        'http://localhost:3000',
        'http://localhost:5000'
    ],
    credentials: true,
}));


//  View HTMLs
app.set('view engine','ejs');
app.use(express.static(__dirname + '/public'));

// Static File Services
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Using native Promise of Node.js
mongoose.Promise = global.Promise;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: false,
};

// Connect to MongoDB for multiple DBs
try {
    mongoose.admin_conn = mongoose.createConnection(config.mongo_uri_admin, options)
    logger.info('admin DB connected successfully!')
} catch(err) {
    logger.error(err.stack)
}

//try {
//    mongoose.config_conn = mongoose.createConnection(config.mongo_uri_config, options)
//    logger.info('config DB connected successfully!')
//} catch(err) {
//    logger.error(err.stack)
//}

const NEW_CHAT_MESSAGE_EVENT = 'newChatMessage'

const chatService = require('./services/chat')

io.on('connection', socket => {
    const {roomId} = socket.handshake.query
    socket.join(roomId)
    socket.on(NEW_CHAT_MESSAGE_EVENT, async(data) => {
        await chatService.createChat(roomId, data.body, data.senderId)
        const date = new Date().toISOString()
        io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data, date)
        
    })
    
    socket.on('disconnect', () => {
        socket.leave(roomId)
    })
})

// Routers
app.use('/api', require('./api/index'));

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.listen(config.port, () => console.log(`Server listening on port ${config.port}`));

socket_server.listen(config.socket_port, () => console.log(`Server listening on port ${config.socket_port}`))