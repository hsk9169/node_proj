const url = require('url');
const logger = require('../config/winston');
const authService = require('../services/auth');

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
    await authService.authAccessToken(req.query)
        .then((accessToken) => {
            console.log(accessToken);
            token.accessToken = accessToken;
        })
        .catch(err => {
            logger.error('POST /api/auths/token');
            res.status(500).send(err);
        });
    await authService.authRefreshToken(req.query)
    .then((refreshToken) => {
        console.log(refreshToken);
        token.refreshToken = refreshToken;
        res.json(token);
    })
    .catch(err => {
        logger.error('POST /api/auths/token');
        res.status(500).send(err);
    });
}