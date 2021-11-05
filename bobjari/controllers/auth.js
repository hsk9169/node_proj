const url = require('url');
const logger = require('../config/winston');
const authService = require('../services/auth');
const jwt = require('jsonwebtoken');

exports.authKakao = async (req, res, next) => {
    logger.info('POST /api/auths/kakao');
    await authService.authKakao(req.body)
        .then((profile) => {
            logger.info('got profile, redirect to user to check if exists');
            res.redirect(url.format({
                pathname: '/api/users/email',
                query: profile,
            }))
        })
        .catch(err => {
            logger.error('POST /api/auths/kakao');
            logger.error(err.stack);
            res.status(500).send(err);
        });
}

exports.authEmail = async (req, res, next) => {
    logger.info('POST /api/auths/email');
    await authService.authEmail(req.body.email)
        .then((authNum) => {
            logger.info('got auth number, response to client');
            res.json(authNum);
        })
        .catch(err => {
            logger.error('POST /api/auths/email');
            logger.error(err.stack);
            res.status(500).send(err);
        });
}

exports.authToken = async (req, res, next) => {
    logger.info('POST /api/auths/token');
    let token = {accessToken: '', refreshToken: ''};
    if (req.query.email) {
        token.accessToken = jwt.sign({ email: req.query.email}, 
            'shhhhh', { expiresIn: 60});
        token.refreshToken = jwt.sign({ email: req.query.email}, 
            'shhhhh', { expiresIn: 600});
    } else {
        token.accessToken = jwt.sign({ phone: req.query.phone, password: req.query.password}, 
            'shhhhh', { expiresIn: 60});
        token.refreshToken = jwt.sign({ phone: req.query.phone, password: req.query.password}, 
            'shhhhh', { expiresIn: 600});
    }
    console.log(token);
    res.json({
        token: token
    });
}