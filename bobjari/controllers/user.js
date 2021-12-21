const logger = require('../config/winston');
const url = require('url');
const userService = require('../services/user');
const imgLoader = require('../middlewares/imgLoader');
const multer = require('multer');
const { read } = require('../config/winston');

// Common
exports.getUserByEmail = async (req, res, next) => {
    logger.info('GET /users/email');
    await userService.getMenteeByEmail(req.query.email)
        .then((mentee) => {
            if(mentee) {
                logger.info('mentee account found');
                mentee.role = 'mentee';
                res.json(mentee);
            } else {
                logger.info('no mentee account found');
                userService.getMentorByEmail(req.query.email)
                .then((mentor) => {
                    if(mentor) {
                        logger.info('mentor account found');
                        mentor.role = 'mentor';
                        res.json(mentor);
                    } else {
                        logger.info('no mentor account found');
                        res.status(204).send('no account found');
                    }
                })
                .catch(err => {
                    logger.error('GET /users/email');
                    logger.error(err.stack);
                    res.status(400).send(err);
                });
            }
        })
        .catch(err => {
            logger.error('GET /users/email');
            logger.error(err.stack);
            res.status(400).send(err);
        });    
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
    imgLoader.uploadImage(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            console.log('max image size exceeded');
            console.log(err);
            res.status(400).send('max image file size 50MB exceeded');
        } else if (err) {
            console.log('only image file is allowed');
            res.status(400).send('only image file is allowed');
        } else if (!req.file) {
            console.log('no file found');
            userService.postMentee({
                userInfo: {
                    email: req.body.email,
                    age: req.body.age,
                    gender: req.body.gender,
                    nickname: req.body.nickname,
                },
                role: true,
                interests: req.body.interests,
                profileImg: {
                    data: req.body.img,
                    contentType: 'url',
                },
            }) 
            .then((mentee) => {
                if(mentee) {
                    logger.info('mentee account added');
                    res.json(mentee.userInfo.email);
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
        } else {
            console.log('file uploaded successfully');
            userService.postMentee({
                userInfo: {
                    email: req.body.email,
                    age: req.body.age,
                    gender: req.body.gender,
                    nickname: req.body.nickname,
                },
                role: true,
                interests: req.body.interests,
                profileImg: {
                    data: req.file.buffer,
                    contentType: req.file.mimetype,
                },
            }) 
            .then((mentee) => {
                if(mentee) {
                    logger.info('mentee account added');
                    res.json(mentee.userInfo.email);
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
        if (err instanceof multer.MulterError) {
            console.log('max image size exceeded');
            console.log(err);
            res.status(400).send('max image file size 50MB exceeded');
        } else if (err) {
            console.log('only image file is allowed');
            res.status(400).send('only image file is allowed');
        } else if (!req.files) {
            console.log('no file found');
            userService.postMentor({
                userInfo: {
                    email: req.body.email,
                    age: req.body.age,
                    gender: req.body.gender,
                    nickname: req.body.nickname,
                },
                role: true,
                careerInfo: {
                    job: req.body.job,
                    company: req.body.company,
                    topics: req.body.topics,
                    auth: {
                        method: req.body.auth,
                        data: '',
                    },
                    introduce: req.body.introduce,
                    hashtags: null,
                },
                appointment: {
                    schedules: req.body.schedules,
                    locations: req.body.cafes,
                    fee: req.body.fee,
                },
                profileImg: {
                    data: req.body.img,
                    contentType: 'url',
                },
            }) 
            .then((mentor) => {
                if(mentor) {
                    logger.info('mentor account added');
                    res.json(mentor.userInfo.email);
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
        } else {
            console.log('files exist');
            const jsonData = JSON.stringify(req.body);
            console.log(jsonData)
            userService.postMentor({
                userInfo: {
                    email: req.body.email,
                    age: req.body.age,
                    gender: req.body.gender,
                    nickname: req.body.nickname,
                },
                role: true,
                careerInfo: {
                    job: req.body.job,
                    company: req.body.company,
                    topics: req.body.topics,
                    auth: {
                        method: req.body.authSelect,
                        file: {
                            data: req.files[1].buffer,
                            contentType: req.files[1].mimetype,
                        },
                    },
                    introduce: req.body.introduce,
                    hashtags: null,
                },
                appointment: {
                    schedules: req.body.schedules,
                    locations: req.body.cafes,
                    fee: req.body.fee,
                },
                profileImg: {
                    data: req.files[0].buffer,
                    contentType: req.files[0].mimetype,
                },
            }) 
            .then((mentor) => {
                if(mentor) {
                    logger.info('mentor account added');
                    res.json(mentor.userInfo.email);
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