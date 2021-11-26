const logger = require('../config/winston');
const url = require('url');
const authService = require('../services/auth');
const userService = require('../services/user');
const config = require('../config/index');

exports.signInKakao = async (req, res, next) => {
    logger.info('POST /sign/in/kakao');

    res.redirect(url.format({
        pathname: '/api/users/email',
        query: {
            email: req.body.email,
        }
    }))
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