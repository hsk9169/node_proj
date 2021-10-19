const url = require('url');
const logger = require('../config/winston');
const { authMiddleware } = require('../middlewares/auth');
const authService = require('../services/auth');

exports.authKakao = async (req, res, next) => {
    logger.info('POST /api/auths/kakao');
    await authService.authKakao(req.body)
        .then((profile) => {
            res.redirect('/api/users/check?email='+profile.email);
        })
        .catch(err => {
            logger.error('POST /auths/kakao');
            logger.error(err.stack);
            res.status(500).send(err);
        });
}

exports.checkSession = async (req, res, next) => {
    logger.info('GET /api/auths/session');
    res.json({
        success: true,
        info: req.decoded,
    });
}