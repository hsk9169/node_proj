const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({ 
    destination: '../uploads/',
    filename: (req, file, cb) => {
        cb(null, 'imgfile'+Date.now());
    }
});

exports.uploadImage = multer({
    //storage: storage,
    fileFilter: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            cb(new Error('Only images are allowed'), false);
        }
        cb(null, true);
    },
    limits: { fileSize: 500 * 1024 * 1024 }
}).single('img');