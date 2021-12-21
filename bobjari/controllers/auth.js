const url = require('url');
const logger = require('../config/winston');
const authService = require('../services/auth');
const jwt = require('jsonwebtoken');

exports.authKakao = async (req, res, next) => {
    logger.info('POST /api/auths/kakao');
    await authService.authKakao(req.body)
        .then((profile) => {
            logger.info('got kakao profile');
            res.json(profile);
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
    logger.info('GET /api/auths/token');

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
    res.json({
        token: token
    });
}

exports.verifyToken = async (req, res, next) => {
    logger.info('GET /api/auth/verify');
    res.status(200).send('valid');
}