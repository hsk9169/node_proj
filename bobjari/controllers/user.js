const logger = require('../config/winston');
const url = require('url');
const userService = require('../services/user');
const imgLoader = require('../middlewares/imgLoader');
const multer = require('multer');

exports.postUser = async (req, res) => {
    logger.info('POST /users/create');
    imgLoader.uploadImage(req, res, (err) => {
        console.log(req);
        if (err instanceof multer.MulterError) {
            console.log('max image size exceeded');
            console.log(err);
            res.status(400).send('max image file size 50MB exceeded');
        } else if (err) {
            console.log('only image file is allowed');
            console.log(req.file);
            res.status(400).send('only image file is allowed');
        } else if (!req.file) {
            console.log('no file found');
            res.status(400).send('no file found');
        } else {
            console.log('file uploaded successfully');
            console.log(req.file.originalname);
            console.log(req.file.mimetype);
            console.log(req.file.buffer);
            userService.postUser({
                userInfo: req.body,
                profileImg: {
                    data: req.file.buffer,
                    contentType: req.file.mimetype,
                },
            }) 
                .then((ret) => {
                    res.json(ret);
                })
                .catch(err => {
                    logger.error('POST /user/image/create');
                    logger.error(err);
                    res.status(400).send('file uploading failed');
                });
        };
    });
}

exports.getUsers = async (req, res, next) => {
    logger.info('GET /users');
    await userService.getUsers()
        .then((users) => {
            if(!users.length) {
                logger.error('no data to GET');
                return res.status(404).send(
                    { err: 'data not found' }
                );
            } else {
                logger.info('success GET');
                res.json(users);
            }
        })
        .catch(err => {
            logger.error('GET /users/');
            logger.error(err.stack);
            res.status(500).send(err);
        });
}
/*
exports.getUserByUserid = async (req, res, next) => {
    logger.info(`GET /userid/{req.params.userid}`);
    let userId = req.params.userid;
    await userService.getUserByUserid(userId)
        .then((user) => {
            if(!user) {
                logger.error('no data to GET');
                return res.status(404).send(
                    { err: 'data not found' }
                );
            } else {
                logger.info('success GET');
                res.json(user);
            }
        })
        .catch(err => {
            logger.error('GET /users/');
            logger.error(err.stack);
            res.status(500).send(err);
        });
}

exports.putUserByUserid = async (req, res, next) => {
    logger.info(`PUT /userid/{req.params.userid}`);
    let userId = req.params.userid;
    await userService.putUserByUserid(userId, req.body)
        .then((user) => {
            res.json(user);
        })
        .catch(err => {
            logger.error('POST /user');
            logger.error(err.stack);
            res.status(500).send(err);
        });
}

exports.deleteUserByUserid = async (req, res, next) => {
    logger.info(`DELETE /userid/{req.params.userid}`);
    let userId = req.params.userid;
    await userService.deleteUserByUserid(userId)
        .then((ret) => {
            logger.info('success DELETE');
            console.log(ret);
            res.status(200).send('success DELETE');
        })
        .catch(err => {
            logger.error(`DELETE /users/{req.params.userid}`);
            logger.error(err.stack);
            res.status(500).send(err);
        });
}
*/
exports.getUserByEmail = async (req, res, next) => {
    logger.info('GET /users/email');
    // this doesn't fulfill sync timing
    await userService.getUserByEmail(req.query.email)
        .then((user) => {
            if(user) {
                logger.info('user account exists, get token');
                res.redirect(url.format({
                    pathname: '/api/auths/token',
                    query: {
                        email: user.email,
                    },
                }));
            } else {
                logger.info('no user account, return profile');
                console.log(req.query);
                res.json(req.query);
            }
        })
        .catch(err => {
            logger.error('GET /users/email');
            logger.error(err.stack);
            res.status(500).send(err);
        });
}

exports.postUserByPhone = async (req, res, next) => {
    logger.info('POST /users/phone');
    await userService.getUserByPhone(req.query.phone)
        .then((user) => {
            if(!user) {
                logger.info('no user account, return none');
                res.status(200);
            } else {
                logger.info('user account exists');
                res.redirect(url.format({
                    pathname: '/api/auths/token',
                    query: user,
                }));
            }
        })
        .catch(err => {
            logger.error('POST /users/phone');
            logger.error(err.stack);
            res.status(500).send(err);
        });
}

exports.postUserByNickname = async (req, res, next) => {
    logger.info('POST /users/nickname');
    console.log(req.body);
    await userService.getUserByNickname(req.body.nickname)
        .then((user) => {
            if(!user) {
                logger.info('no duplicated nickname');
                res.status(200).send('available');
            } else {
                logger.info('nickname duplicates');
                res.status(200).send('duplicated')
            }
        })
        .catch(err => {
            logger.error('POST /users/nickname');
            logger.error(err.stack);
            res.status(500).send(err);
        });
}