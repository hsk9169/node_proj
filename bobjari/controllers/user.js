const logger = require('../config/winston');
const url = require('url');
const userService = require('../services/user');
const imgLoader = require('../middlewares/imgLoader');
const multer = require('multer');
const { read } = require('../config/winston');

// Create User
exports.postUser = async (req, res) => {
    logger.info('POST /users')
    imgLoader.uploadFiles(req, res, err => {
        let files = {img: null, auth: null}
        if (err instanceof multer.MulterError) {
            logger.error(err)
            res.status(400).send('file uploading failed')
        } else {
            logger.info('body found')
            let data = {}
            if (req.files) {
                req.files.map(el => {
                    if (el.fieldname === 'img') {
                        files.img = el
                        logger.info('image file found')
                    } else if (el.fieldname === 'auth') {
                        files.auth = el
                        logger.info('auth file found')
                    }
                })
            }
            Object.keys(req.body).forEach(key => {
                if (key !== 'auth') {
                    data[key] = JSON.parse(req.body[key])
                }
            })
            logger.info('profile data')
            logger.info(JSON.stringify(data, null, 2))

            userService.createUser(data, files)
                .then(user => {
                    if (user) {
                        logger.info('user account created')
                        logger.info(user)
                        res.redirect(url.format({
                            pathname: '/api/users/email',
                            query: {
                                email: user.profile.email,
                            }
                        }))
                    } else {
                        logger.info('failed adding user account');
                        res.status(400).send('failed adding user');
                    }
                })
                .catch(err => {
                    logger.error('POST /users');
                    logger.error(err.stack);
                    res.status(500).send(err);
                })
        }
    })
}

// Check if Nickname Duplicates
exports.getUserByNickname = async (req, res, next) => {
    logger.info('GET /users/nickname')
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
            res.status(500).send(err);
        })
}

// Find User by Email and Return
exports.getUserByEmailWithDetails = async (req, res, next) => {
    logger.info('GET /users/email');
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
            res.status(400).send(err);
        });
}

exports.changeUserRole = async (req, res, next) => {
    logger.info('GET /users/change')
    if (req.query.role === 'mentee') {
        await userService.updateMenteeRole(req.query.email, true)
            .then(mentee => {
                console.log(mentee.roleInfo)
                logger.info(`inactivating user's role as mentee`)
            })
            .catch(err => {
                logger.error('GET /user/change');
                logger.error(err);
                res.status(400).send(err);
            });
        await userService.updateMentorRole(req.query.email, false)
            .then(mentor => {
                console.log(mentor.roleInfo)
                logger.info(`activating user's role as mentor`)
                res.json(mentor)
            })
            .catch(err => {
                logger.error('GET /user/change');
                logger.error(err);
                res.status(400).send(err);
            });
    } else if (req.query.role === 'mentor') {
        await userService.updateMentorRole(req.query.email, true)
            .then(mentor => {
                console.log(mentor.roleInfo)
                logger.info(`inactivating user's role as mentor`)
            })
            .catch(err => {
                logger.error('GET /user/change');
                logger.error(err);
                res.status(400).send(err);
            });
        await userService.updateMenteeRole(req.query.email, false)
            .then(mentee => {
                console.log(mentee.roleInfo)
                logger.info(`activating user's role as mentee`)
                res.json(mentee)
            })
            .catch(err => {
                logger.error('GET /user/change');
                logger.error(err);
                res.status(400).send(err);
            });
    } else {
        res.status(400).send('invalid current role as a request');
    }
}

exports.postUserByPhone = async (req, res, next) => {
    logger.info('POST /users/phone');
    await userService.getMenteeByPhone(req.query.phone)
        .then((mentee) => {
            if(!mentee) {
                logger.info('no mentee account found');
                res.status(404);
            } else {
                logger.info('mentee account exists');
                res.redirect(url.format({
                    pathname: '/api/auths/token',
                    query: mentee,
                }));
            }
        })
        .catch(err => {
            logger.error('POST /users/mentee/phone');
            logger.error(err.stack);
            res.status(500).send(err);
        });
}        

exports.getMentees = async (req, res, next) => {
    logger.info('GET /users/mentee');
    
    await userService.getMentees()
        .then((mentees) => {
            if(!mentees.length) {
                logger.error('no data to GET');
                return res.status(404).send(
                    { err: 'data not found' }
                );
            } else {
                logger.info('success GET');
                res.json(mentees);
            }
        })
        .catch(err => {
            logger.error('GET /users/mentee');
            logger.error(err.stack);
            res.status(500).send(err);
        });
}

exports.getMentors = async (req, res, next) => {
    logger.info('GET /users/mentor');
    let keyword = null, startIdx = null, num = null;
    try {keyword = req.query.keyword} catch{} 
    try {startIdx = req.query.startIdx} catch{} 
    try {num = req.query.num} catch{}
    if (keyword === undefined ||
        startIdx === undefined ||
        num === undefined) {
        logger.info('invalid query parameter')
        return res.status(400).send('invalid query parameter');
    } else {
        logger.info('keyword: ' + keyword + ' , startIdx: ' + startIdx + ' , num: ' + num)
        await userService.getMentors(keyword, startIdx, num)
            .then((mentors) => {
                if(!mentors.length) {
                    logger.info('no data to GET');
                    return res.status(204).send('no user account found');
                } else {
                    logger.info('success GET');
                    logger.info(mentors.length + ' mentors found')
                    res.json(mentors);
                }
            })
            .catch(err => {
                logger.error('GET /users/mentor');
                logger.error(err.stack);
                res.status(500).send(err);
            });
    }
}

exports.updateMentorAllowSearch = async (req, res, next) => {
    logger.info('GET /users/mentor/searchAllow')
    const email = req.query.email;
    const curState = (req.query.curState === 'true' ? true : false);
    await userService.updateMentorAllowSearch(email, curState)
        .then(mentor => {
            logger.info('toggle mentor search allow')
            res.json(mentor)
        })
        .catch(err => {
            logger.error('GET /users/mentor/searchAllow')
            logger.error(err.stack)
            res.status(500).send(err)
        })
}

