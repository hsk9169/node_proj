const multer = require('multer');
const path = require('path');
const logger = require('../config/winston')

const storage = multer.diskStorage({ 
    destination: '../uploads/',
    filename: (req, file, cb) => {
        cb(null, 'file'+Date.now());
    }
});

exports.uploadImage = multer({
    fileFilter: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            cb(new Error('Only images are allowed'), false);
        }
        cb(null, true);
    },
    limits: { fileSize: 500 * 1024 * 1024 }
}).single('img');

exports.uploadFiles = multer({
    fileFilter: function (req, file, cb) {
        logger.info('file', file)
        const ext = path.extname(file.originalname);
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            cb(new Error('Only images are allowed'), false);
        }
        cb(null, true);
    },
    limits: { fileSize: 500 * 1024 * 1024 }
}).any();