const logger = require('../config/winston');
const url = require('url');
const userService = require('../services/user');
const imgLoader = require('../middlewares/imgLoader');
const multer = require('multer');
const { read } = require('../config/winston');

exports.postUser = (req, res) => {
    logger.info('POST /user')
    imgLoader.uploadFiles(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            logger.info('file uploading error')
            logger.info(err)
            res.statusMessage = err
            res.status(400).end()
        } else {
            let data = {}
            let files = {img: null, auth: null}
            try { files.img = req.files.img[0] }
            catch {}
            try { files.auth = req.files.auth[0] }
            catch {}
            Object.keys(req.body).forEach(key => {
                if (key !== 'auth') {
                    data[key] = JSON.parse(req.body[key])
                }
            })
            await userService.createUser(data, files)
                .then(user => {
                    if (user) {
                        logger.info('user account created')
                        logger.info(user)
                        res.redirect(url.format({
                            pathname: '/api/user/email',
                            query: {
                                email: user.profile.email,
                            }
                        }))
                    } else {
                        logger.info('failed adding user account');
                        res.statusMessage = 'bad request for user creation'
                        res.status(400).end()
                    }
                })
                .catch(err => {
                    logger.error('POST /users');
                    logger.error(err.stack);
                    res.status(500).send();
                })
        }
    })  
}

// Check if Nickname Duplicates
exports.getUserByNickname = async (req, res, next) => {
    logger.info('GET /user/nickname')
    const nickname = req.query.nickname
    await userService.findUserByNickname(nickname)
        .then(user => {
            if (user) {
                logger.info('user account found : ' + nickname)
                res.status(200).send('duplicates')
            } else {
                logger.info('no user account found : ' + nickname);
                res.status(200).send('available');
            }
        })
        .catch(err => {
            logger.error('GET /users/nickname');
            logger.error(err.stack);
            res.status(500).send();
        })
}

// Find User by Email and Return
exports.getUserByEmailWithDetails = async (req, res, next) => {
    logger.info('GET /user/email');
    const email = req.query.email
    await userService.getUserByEmailWithDetails(email)
        .then(user => {
            if (user) {
                logger.info('user account found : ' + email);
                res.json(user)
            } else {
                logger.info('no user account found : ' + email)
                res.status(200).send('no user found')
            }
        })
        .catch(err => {
            logger.error('GET /users/email');
            logger.error(err.stack);
            res.status(500).send();
        });
}

exports.changeUserRoleByEmail = async (req, res, next) => {
    logger.info('GET /user/change')
    try {
        const curRole = req.query.role
        const email = req.query.email
        await userService.changeUserRoleByEmail(curRole, email)
            .then(user => {
                if (user) {
                    logger.info('user role changed : ' + user.role)
                    res.json(user.role)
                } else {
                    logger.info('no user account found : ' + email)
                    res.status(200).send('no user found')
                }
            })
            .catch(err => {
                logger.error('GET /users/change');
                logger.error(err.stack);
                res.status(500).send();
            })
    } catch {
        logger.info('invalid query parameters')
        res.statusMessage = 'invalid query parameters'
        res.status(400).end()
    }
}

exports.toggleUserSearchAllowByEmail = async (req, res, next) => {
    logger.info('GET /user/searchAllow')
    try {
        const email = req.query.email;
        const curState = (req.query.curState === 'true' ? true : false);
        await userService.toggleUserSearchAllowByEmail(email, curState)
            .then(user => {
                logger.info('toggle user search allow')
                console.log(user.searchAllow)
                res.json(user.searchAllow)
            })
            .catch(err => {
                logger.error('GET /users/searchAllow')
                logger.error(err.stack)
                res.status(500).send()
            })
    } catch {
        logger.info('invalid query parameters')
        res.statusMessage = 'invalid query parameters'
        res.status(400).end()
    }
}

exports.removeUserById = async (req, res) => {
    logger.info('DELETE /user')
    try {
        const userId = req.query.email
        await userService.removeUserById(userId)
            .then(ret => {
                if (ret.deletedCount > 0) {
                    logger.info('user deleted successfully : ' + email)
                    res.status(200).send('removed successfully')
                } else {
                    logger.info('no matched user found : ' + email)
                    res.status(204).send('no matched user found')
                }
            })
            .catch(err => {
                logger.error('DELETE /user')
                logger.error(err.stack)
                res.status(500).send()
            })
    } catch {
        logger.info('invalid query parameters')
        res.statusMessage = 'invalid query parameters'
        res.status(400).end()
    }
}