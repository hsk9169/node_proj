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

exports.authToken = async (req, res, next) => {
    logger.info('POST /api/auths/token');
    let token = {accessToken: '', refreshToken: ''};
    token.accessToken = jwt.sign({ email: req.query.email}, 'shhhhh', { expiresIn: 60});
    token.refreshToken = jwt.sign({ email: req.query.email}, 'shhhhh', { expiresIn: 600});
    res.json(token);
}