const logger = require('../config/winston');
const userService = require('../services/user');

exports.postUser = async (req, res, next) => {
    logger.info('POST /user');
    await userService.postUser(req.body)
        .then((user) => {
            res.json(user);
        })
        .catch(err => {
            logger.error('POST /user');
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
        .then((r) => {
            logger.info('success DELETE');
            console.log(r);
            res.status(200).send('success DELETE');
        })
        .catch(err => {
            logger.error(`DELETE /users/{req.params.userid}`);
            logger.error(err.stack);
            res.status(500).send(err);
        });
}