const multer = require('multer');
const path = require('path');
const logger = require('../config/winston')

const storage = multer.diskStorage({ 
    destination: '../uploads/',
    filename: (req, file, cb) => {
        cb(null, 'file'+Date.now());
    }
});

exports.uploadFiles = multer({
    fileFilter: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            cb(new Error('Only images are allowed'), false);
        }
        cb(null, true);
    },
    limits: { fileSize: 30 * 1024 },
}).fields([
    {name: 'img', maxCount: 1},
    {name: 'auth', maxCount: 1}
]);