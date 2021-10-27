const logger = require('../config/winston');
const url = require('url');
const userService = require('../services/user');

exports.postUser = async (req, res, next) => {
    logger.info('POST /users/create');
    await userService.postUser(req.body) 
        .then((ret) => {
            res.json(ret);
        })
        .catch(err => {
            logger.error('POST /user/create');
            logger.error(err);
            res.status(404).send(err);
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
                        email: user.nickname,
                    }
                }));
                //res.redirect('/api/auths/token/?email='+user.email);
            } else {
                logger.info('no user account, return profile');
                res.json(req.query);
            }
        })
        .catch(err => {
            logger.error('GET /users/email');
            logger.error(err.stack);
            res.status(500).send(err);
        });
}

exports.getUserByPhone = async (req, res, next) => {
    logger.info('GET /users/phone');
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
            logger.error('GET /users/phone');
            logger.error(err.stack);
            res.status(500).send(err);
        });
}

exports.getUserByNickname = async (req, res, next) => {
    logger.info('GET /users/nickname');
    console.log(req.query);
    console.log(req.body);
    await userService.getUserByNickname(req.query.nickname)
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
            logger.error('GET /users/nickname');
            logger.error(err.stack);
            res.status(500).send(err);
        });
}