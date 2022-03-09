const logger = require('../config/winston');
const url = require('url');
const authService = require('../services/auth');
const userService = require('../services/user');
const config = require('../config/index');

exports.signInKakao = async (req, res, next) => {
    logger.info('POST /signin/kakao');
    const email = req.body.email
    await userService.getUserByEmailWithDetails(email)
        .then(user => {
            if (user) {
                logger.info('user account found : ' + email)
                res.json(user)
            } else {
                logger.info('no user accound found : ' + email)
                res.status(200).send('no user found')
            }
        })
        .catch(err => {
            logger.error('GET /signin/kakao')
            logger.error(err.stack)
            res.status(400).send()
        })
}

exports.signInBob = async (req, res, next) => {
    logger.info('POST /signin/bob');
    const email = req.body.email
    await userService.getUserByEmailWithDetails(email)
        .then(user => {
            if (user) {
                logger.info('user account found : ' + email)
                res.json(user)
            } else {
                logger.info('no user accound found : ' + email)
                res.status(200).send('no user found')
            }
        })
        .catch(err => {
            logger.error('GET /signin/bob')
            logger.error(err.stack)
            res.status(400).send()
        })
}