const logger = require('../config/winston');
const router = require('express').Router();
const imgLoader = require('../middlewares/imgLoader');
const multer = require('multer');

router.use('/users', require('./users'));

router.use('/auths', require('./auths/index'));

router.use('/sign', require('./sign'));


router.post('/uploadfile', (req, res) => {
    imgLoader.uploadImage(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            console.log('max image size exceeded');
            console.log(req.file);
            res.status(200).send('max image file size 50MB exceeded');
        } else if (err) {
            console.log('only image file is allowed');
            console.log(req.file);
            res.status(200).send('only image file is allowed');
        } else if (!req.file) {
            console.log('no file found');
            res.status(200).send('no file found');
        } else {
            console.log('file uploaded successfully');
            console.log(req.file);
            res.status(200).send('file uploaded successfully');
        }
    })
}); 

module.exports = router;
