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
    console.log('/auths/token', req.body);
    await authService.authToken(req.body)
        .then((token) => {
            res.json(token);
        })
        .catch(err => {
            logger.error('POST /api/auths/signup');
            res.status(500).send(err);
        });
}