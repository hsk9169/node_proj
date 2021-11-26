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
                query: {
                    email: profile.email,
                }
            }))
        })
        .catch(err => {
            logger.error('POST /sign/in/kakao');
            logger.error(err);
            res.status(500).send(err);
        });
}

exports.signInBob = async (req, res, next) => {
    logger.info('POST /sign/in/bob');
    res.redirect(url.format({
        pathname: '/api/users/email',
        query: {
            email: req.body.email,
        }
    }));
}

exports.signInTest = async(req, res, next) => {
    logger.info('GET /test/jwt');
    console.log(req.decoded);

    // determine if Email / Phone sign in
    res.redirect(url.format({
        pathname: '/api/users/email',
        query: {
            email: req.decoded.email,
        }
    }));
}