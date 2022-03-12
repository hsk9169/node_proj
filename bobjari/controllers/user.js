const logger = require('../config/winston');
const url = require('url');
const userService = require('../services/user');
const imgLoader = require('../middlewares/imgLoader');
const multer = require('multer');
const { read } = require('../config/winston');
const waterfall = require('async/waterfall')

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

            waterfall([
                (cb) => {
                    userService.createUser(data, files)
                        .then(user => {
                            logger.info('user created successfully')
                            cb(null, user)
                        })
                        .catch(err => cb(err))
                },
                (user, cb) => {
                    userService.getUserByEmailWithDetails(user.profile.email)
                        .then(userDetails => {
                            logger.info('user details found successfully')
                            cb(null, userDetails)
                        })
                        .catch(err => cb(err))
                }
            ], (err, results) => {
                if (err) {
                    logger.error('failed creating user')
                    logger.error(err.stack)
                    res.status(400).end()
                } else {
                    logger.info('user created successfully')
                    logger.info(results)
                    res.json(results)
                }
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
            res.status(400).end()
        })
}

exports.changeUserRoleById = async (req, res, next) => {
    logger.info('GET /user/change')
    try {
        const curRole = req.query.role
        const userId = req.query.userId
        await userService.changeUserRoleById(curRole, userId)
            .then(user => {
                if (user) {
                    logger.info('user role changed : ' + user.role)
                    res.json(user.role)
                } else {
                    logger.info('no user account found : ' + userId)
                    res.status(200).send('no user found')
                }
            })
            .catch(err => {
                logger.error('GET /users/change');
                logger.error(err.stack);
                res.status(400).end()
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
        const userId = req.query.userId
        await userService.removeUserById(userId)
            .then(ret => {
                if (ret.deletedCount > 0) {
                    logger.info('user deleted successfully : ' + userId)
                    res.status(200).send('removed successfully')
                } else {
                    logger.info('no matched user found : ' + userId)
                    res.status(204).send('no matched user found')
                }
            })
            .catch(err => {
                logger.error('DELETE /user')
                logger.error(err.stack)
                res.status(400).end()
            })
    } catch {
        logger.info('invalid query parameters')
        res.statusMessage = 'invalid query parameters'
        res.status(400).end()
    }
}