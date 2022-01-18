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
                if (mentee.roleInfo.isActivated) {
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
                    if (mentor.roleInfo.isActivated) {
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
        } else {
            let data = {};
            if (req.files) {
                req.files.map(el => {
                    if (el.fieldname === 'img') {
                        imgFile = el;
                    }
                })
                logger.info('img file found')
                logger.info(imgFile)
            }
            Object.keys(req.body).forEach(key => {
                data[key] = JSON.parse(req.body[key])
            })
            logger.info('profile data')
            logger.info(JSON.stringify(data, null, 2))
            userService.createMentor({
                userInfo: {
                    email: data.email,
                    age: data.age,
                    gender: data.gender,
                    nickname: data.nickname,
                },
                roleInfo: {
                    role: 'mentor',
                    isActivated: false,
                },
                searchAllow: false,
                careerInfo: {
                    job: [],
                    compnay: [],
                    years: '',
                    topics: [],
                    auth: {
                        metnod: '',
                        isAuth: null,
                        file: {
                            data: null,
                            contentType: '',
                        }
                    },
                    title: '',
                    introduce: '',
                    hashtags: []
                },
                appointment: {
                    schedules: [],
                    locations: [],
                    fee: {
                        select: null,
                        value: '',
                    },
                },
                profileImg: {
                    data: (imgFile!==null ? imgFile.buffer : data.img),
                    contentType: (imgFile!==null ? imgFile.mimetype : 'url'),
                },
            })
            .then(mentor => {
                if(mentor) {
                    logger.info('mentor account added');
                    logger.info(mentor)
                } else {
                    logger.info('failed adding mentor account');
                    res.status(400).send('failed adding mentor');
                }
            })
            .catch(err => {
                logger.error('GET /users/mentee/email');
                logger.error(err.stack);
                res.status(500).send(err);
            });
            userService.createMentee({
                userInfo: {
                    email: data.email,
                    age: data.age,
                    gender: data.gender,
                    nickname: data.nickname,
                },
                roleInfo: {
                    role: 'mentee',
                    isActivated: true,
                },
                interests: data.interests,
                profileImg: {
                    data: (imgFile!==null ? imgFile.buffer : data.img),
                    contentType: (imgFile!==null ? imgFile.mimetype : 'url'),
                },
            }) 
            .then(mentee => {
                if(mentee) {
                    logger.info('mentee account added');
                    logger.info(mentee)
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
        let imgFile = null, authFile = null;
        if (err instanceof multer.MulterError) {
            logger.error(err);
            res.status(400).send('max image file size 50MB exceeded');
        } else {
            logger.info('body found');
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
            userService.createMentee({
                userInfo: {
                    email: data.email,
                    age: data.age,
                    gender: data.gender,
                    nickname: data.nickname,
                },
                roleInfo: {
                    role: 'mentee',
                    isActivated: false,
                },
                interests: null,
                profileImg: {
                    data: (imgFile!==null ? imgFile.buffer : data.img),
                    contentType: (imgFile!==null ? imgFile.mimetype : 'url'),
                },
            })
            .then(mentee => {
                if(mentee) {
                    logger.info('mentee account added');
                    logger.info(mentee)
                } else {
                    logger.info('failed adding mentee account');
                    res.status(400).send('failed adding mentee');
                }
            })
            .catch(err => {
                logger.error('GET /users/mentor/email');
                logger.error(err.stack);
                res.status(500).send(err);
            });
            userService.createMentor({
                userInfo: {
                    email: data.email,
                    age: data.age,
                    gender: data.gender,
                    nickname: data.nickname,
                },
                roleInfo: {
                    role: 'mentor',
                    isActivated: true,
                },
                searchAllow: true,
                careerInfo: {
                    job: data.job,
                    company: data.company,
                    years: data.years,
                    topics: data.topics,
                    auth: {
                        method: data.authSelect,
                        isAuth: data.isAuth,
                        file: {
                            data: (authFile!==null ? authFile.buffer : null),
                            contentType: (authFile!==null ? authFile.mimetype : ''),
                        }
                    },
                    introduce: data.introduce,
                    title: data.title,
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
                    logger.info(mentor);
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
    let keyword = null, startIdx = null, num = null;
    try {keyword = req.query.keyword} catch{} 
    try {startIdx = req.query.startIdx} catch{} 
    try {num = req.query.num} catch{}
    if (keyword === undefined ||
        startIdx === undefined ||
        num === undefined) {
        logger.info('invalid query parameter')
        return res.status(204).send('invalid query parameter');
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

