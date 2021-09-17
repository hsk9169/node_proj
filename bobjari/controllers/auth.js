const url = require('url');
const logger = require('../config/winston');
const authService = require('../services/auth');

exports.getAuthKakao = async (req, res, next) => {
    logger.info('GET /auth/kakao');
    await authService.loginKakao()
        .then((loginPage) => {
            res.redirect(loginPage);
        })
        .catch(err => {
            logger.error('GET /auth/kakao');
            logger.error(err.stack);
            res.status(500).send(err);
        });
}

exports.getKakaoCallback = async (req, res, next) => {
    logger.info('GET /auth/kakao/callback');
    const accessCode = req.query.code;
    await authService.loginKakaoCallback(accessCode)
        .then((accessRoute, accessToken) => {
            res.redirect(accessRoute, accessToken);
        })
        .catch(err => {
            logger.error('GET /auth/kakao/callback');
            logger.error(err.stack);
            res.status(500).send(err);
        });
}

exports.getKakaoProfile = async (req, res, next) => {
    logger.info('GET /auth/kakao/profile');
    await authService.loginKakaoGetProfile(req.query)
        .then((profile) => {
            res.redirect(url.format({
                pathname: '/profile',
                query: profile
            }));
        })
        .catch(err => {
            logger.error('GET /auth/kakao/profile');
            logger.error(err.stack);
            res.status(500).send(err);
        })
}