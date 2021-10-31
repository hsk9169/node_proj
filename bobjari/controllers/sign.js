const logger = require('../config/winston');
const url = require('url');
const authService = require('../services/auth');
const userService = require('../services/user');
const config = require('../config/index');

exports.signInKakao = async (req, res, next) => {
    logger.info('POST /sign/in/kakao');
    await authService.authKakao(req.body) 
        .then((profile) => {
            logger.info('got profile, redirect to user controller');
            res.redirect(url.format({
                pathname: '/api/users/email',
                query: profile.email,
            }));
        })
        .catch(err => {
            logger.error('POST /sign/in/kakao');
            logger.error(err);
            res.status(500).send(err);
        });
}

exports.signInBob = async (req, res, next) => {
    logger.info('POST /sign/in/bob');
    await userService.getUserByEmail(req.body.email) 
        .then((profile) => {
            if(profile) {
                logger.info('got profile, get token');
                res.redirect(url.format({
                    pathname: '/api/auths/token',
                    query: {
                        email: profile.email,
                    }
                }));
            } else {
                logger.info('no user account, return profile');
                res.json(req.query);
            }
        })
        .catch(err => {
            logger.error('POST /sign/in/bob');
            logger.error(err);
            res.status(500).send(err);
        });
}

exports.signUp = async (req, res, next) => {
    logger.info('POST /sign/up');
    await userService.postUser(req.body)
        .then((profile) => {
            res.json(profile);
        })
        .catch(err => {
            logger.error('POST /sign/up');
            logger.error(err);
            res.status(500).send(err);
        })
}

exports.signInTest = async(req, res, next) => {
    logger.info('POST /sign/in/test');
    res.redirect(url.format({
        pathname: '/api/users/email',
        query: req.query.email,
    }))
}