const url = require('url');
const logger = require('../config/winston');
const { authMiddleware } = require('../middlewares/auth');
const authService = require('../services/auth');

exports.authKakao = async (req, res, next) => {
    logger.info('POST /auths/kakao');
    console.log(req);
    await authService.authKakao(req.body)
        .then((profile) => {
            res.json(profile);
        })
        .catch(err => {
            logger.error('POST /auths/kakao');
            logger.error(err.stack);
            res.status(500).send(err);
        });
}

exports.checkSession = async (req, res, next) => {
    logger.info(`GET /auths/session`);
    res.json({
        success: true,
        info: req.decoded,
    });
}