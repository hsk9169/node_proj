const logger = require('../config/winston');
const url = require('url');
const authService = require('../services/auth');
const userService = require('../services/user');

exports.signInKakao = async (req, res, next) => {
    logger.info('POST /sign/in/kakao');
    await authService.authKakao(req.body) 
        .then((profile) => {
            logger.info('got profile, redirect to user controller');
            res.redirect(url.format({
                pathname: '/api/users/email',
                query: profile.email,
            }))
        })
        .catch(err => {
            logger.error('POST /sign/in/kakao');
            logger.error(err);
            res.status(404).send(err);
        });
}

exports.signInBob = async (req, res, next) => {
    logger.info('POST /sign/in/bob');
    await userService.getUserByPhone(req.body) 
        .then((profile) => {
            res.redirect(url.format({
                pathname: '/api/users/phone',
                query: profile.phone,
            }))
        })
        .catch(err => {
            logger.error('POST /sign/in/bob');
            logger.error(err);
            res.status(404).send(err);
        });
}