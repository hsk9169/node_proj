const logger = require('../config/winston');
const url = require('url');
const userService = require('../services/user');
const imgLoader = require('../middlewares/imgLoader');
const multer = require('multer');
const { read } = require('../config/winston');

// Common
exports.getUserByEmail = async (req, res, next) => {
    logger.info('GET /users/email');
    let found = false;
    await userService.getMenteeByEmail(req.query.email)
        .then(mentee => {
            if (mentee) {
                logger.info('mentee account found');
                if (mentee.role) {
                    mentee.role = 'mentee'
                    res.json(mentee);
                    found = true;
                } else {
                    logger.info('inactivated as mentee');
                }
            } else {
                logger.info('no mentee account found');
            }
        })
        .catch(err => {
            logger.error('GET /users/email');
            logger.error(err.stack);
            res.status(400).send(err);
        });
    if (!found) {
        await userService.getMentorByEmail(req.query.email)
            .then(mentor => {
                if (mentor) {
                    logger.info('mentor account found');
                    if (mentor.role) {
                        console.log(mentor.userInfo)
                        mentor.role = 'mentor'
                        console.log(mentor.role)
                        res.json(mentor)
                    } else {
                        logger.info('inactivated as mentor');
                    }
                } else {
                    logger.info('no mentor account found');
                    logger.info('no user account found');
                    res.status(204).send('no account found'); 
                }
            })
            .catch(err => {
                logger.error('GET /users/email');
                logger.error(err.stack);
                res.status(400).send(err);
            });
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

exports.postUserByNickname = async (req, res, next) => {
    logger.info('POST /users/nickname');
    await userService.getMenteeByNickname(req.body.nickname)
        .then((mentee) => {
            if(mentee) {
                logger.info('mentee nickname duplicates');
                res.status(200).send('duplicated');
            } else {                
                logger.info('no duplicated mentee nickname');
                userService.getMentorByNickname(req.body.nickname)
                    .then((mentor) => {
                        if(mentor) {
                            logger.info('mentor nickname duplicates');
                            res.status(200).send('duplicated');
                        } else {
                            logger.info('no duplicated mentor nickname');
                            res.status(200).send('available');
                        }
                    })            
            }
        })
        .catch(err => {
            logger.error('POST /users/mentee/nickname');
            logger.error(err.stack);
            res.status(500).send(err);
        });
}


// Mentee
exports.postMentee = async (req, res) => {
    logger.info('POST /users/mentee/create');
    imgLoader.uploadFiles(req, res, (err) => {
        let imgFile = null;
        if (err instanceof multer.MulterError) {
            logger.error(err);
            res.status(400).send('max image file size 50MB exceeded');
        } else if (err) {
            logger.error('only image file is allowed');
            logger.error(err)
            res.status(400).send('only image file is allowed');
        } else {
            let data = {};
            if (req.files) {
                req.files.map(el => {
                    if (el.fieldname === 'img') {
                        imgFile = el;
                    }
                })
                logger.info('img file found')
            }
            Object.keys(req.body).forEach(key => {
                data[key] = JSON.parse(req.body[key])
            })
            logger.info('profile data')
            logger.info(JSON.stringify(data, null, 2))
            userService.postMentee({
                userInfo: {
                    email: data.email,
                    age: data.age,
                    gender: data.gender,
                    nickname: data.nickname,
                },
                role: 'mentee',
                interests: data.interests,
                profileImg: {
                    data: (imgFile!==null ? imgFile.buffer : data.img),
                    contentType: (imgFile!==null ? imgFile.mimetype : 'url'),
                },
            }) 
            .then((mentee) => {
                if(mentee) {
                    logger.info('mentee account added');
                    res.json(mentee);
                } else {
                    logger.info('failed adding mentee account');
                    res.status(400).send('failed adding mentee');
                }
            })
            .catch(err => {
                logger.error('GET /users/mentee/email');
                logger.error(err.stack);
                res.status(500).send(err);
            });
        } 
        
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


// Mentor
exports.postMentor = async (req, res) => {
    logger.info('POST /users/mentor/create');
    imgLoader.uploadFiles(req, res, (err) => {
        console.log(req)
        let imgFile = null, authFile = null;
        if (err instanceof multer.MulterError) {
            logger.error(err);
            res.status(400).send('max image file size 50MB exceeded');
        } else if (err) {
            logger.error('only image file is allowed');
            logger.error(err)
            res.status(400).send('only image file is allowed');
        } else {
            logger.info('files found');
            let data = {};
            if (req.files) {
                req.files.map(el => {
                    if (el.fieldname === 'img') {
                        imgFile = el;
                        logger.info('img file found')
                    } else if (el.fieldname === 'auth') {
                        authFile = el;
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
            userService.postMentor({
                userInfo: {
                    email: data.email,
                    age: data.age,
                    gender: data.gender,
                    nickname: data.nickname,
                },
                role: 'mentor',
                careerInfo: {
                    job: data.job,
                    company: data.company,
                    topics: data.topics,
                    auth: {
                        method: data.authSelect,
                        file: {
                            data: (authFile!==null ? authFile.buffer : null),
                            contentType: (authFile!==null ? authFile.mimetype : ''),
                        }
                    },
                    introduce: data.introduce,
                    hashtags: null,
                },
                appointment: {
                    schedules: data.schedules,
                    locations: data.cafes,
                    fee: {
                        select: data.feeSelect,
                        value: data.fee,
                    },
                },
                profileImg: {
                    data: (imgFile!==null ? imgFile.buffer : data.img),
                    contentType: (imgFile!==null ? imgFile.mimetype : 'url'),
                },
            }) 
            .then((mentor) => {
                if(mentor) {
                    logger.info('mentor account added');
                    res.json(mentor);
                } else {
                    logger.info('failed adding mentor account');
                    res.status(400).send('failed adding mentor');
                }
            })
            .catch(err => {
                logger.error('GET /users/mentor/email');
                logger.error(err.stack);
                res.status(500).send(err);
            });
        }
    });
}

exports.getMentors = async (req, res, next) => {
    logger.info('GET /users/mentor');
    
    await userService.getMentors()
        .then((mentors) => {
            if(!mentors.length) {
                logger.error('no data to GET');
                return res.status(404).send(
                    { err: 'data not found' }
                );
            } else {
                logger.info('success GET');
                res.json(mentors);
            }
        })
        .catch(err => {
            logger.error('GET /users/mentor');
            logger.error(err.stack);
            res.status(500).send(err);
        });
}