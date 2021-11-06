const logger = require('../config/winston');
const url = require('url');
const authService = require('../services/auth');
const userService = require('../services/user');
const config = require('../config/index');
const { restart } = require('pm2');

exports.signInKakao = async (req, res, next) => {
    logger.info('POST /sign/in/kakao');
    await authService.authKakao(req.body) 
        .then((profile) => {
            logger.info('got profile, redirect to user controller');
            res.redirect(url.format({
                pathname: '/api/users/email',
                query: profile.email,
            }));
        })
        .catch(err => {
            logger.error('POST /sign/in/kakao');
            logger.error(err);
            res.status(500).send(err);
        });
}

exports.signInBob = async (req, res, next) => {
    logger.info('POST /sign/in/bob');
    await userService.getUserByEmail(req.body.email) 
        .then((profile) => {
            if(profile) {
                logger.info('got profile, get token');
                res.redirect(url.format({
                    pathname: '/api/auths/token',
                    query: {
                        email: profile.userInfo.email,
                    }
                }));
            } else {
                logger.info('no user account, return profile');
                res.json(req.query);
            }
        })
        .catch(err => {
            logger.error('POST /sign/in/bob');
            logger.error(err);
            res.status(500).send(err);
        });
}

exports.signInTest = async(req, res, next) => {
    logger.info('POST /test/jwt');
    console.log(req.decoded);
    console.log(req.body);

    await userService.getUserByEmail(req.decoded.email)
        .then( (user) => {
            if (user) {
                console.log('user found');
                res.json(user);
            } else {
                console.log('user not found');
                res.status(404);
            }
        })
        .catch( err => {
            logger.error('POST /test/jwt');
            restart.status(500).send(err);
        });
}