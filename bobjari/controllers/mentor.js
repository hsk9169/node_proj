const logger = require('../config/winston');
const url = require('url');
const mentorService = require('../services/mentor');
const likeService = require('../services/like')
const parallel = require('async/parallel')

exports.getMentorByIdWithDetails = async (req, res) => {
    logger.info('GET /api/mentor');
    let menteeId, mentorId
    try {
        menteeId = req.query.menteeId
        mentorId = req.query.mentorId
    } catch {
        logger.warn('insufficient query param received : ', req.query)
        res.statusMessage = 'invalid query param'
        res.status(400).end()
    }
    
    parallel([
        (cb) => {
            mentorService.getMentorByIdWithDetails(mentorId)
                .then(mentor => {
                    if (mentor) {
                        logger.info('mentor detail found successfully')
                    } else {
                        logger.info('no mentor found')
                    }
                    cb(null, mentor)
                })
                .catch(err => cb(err))
        },
        (cb) => {
            likeService.checkLikeByMenteeMentorId(menteeId, mentorId)
                .then(likeList => {
                    if (likeList.length > 0) {
                        logger.info('mentee likes mentor')
                        cb(null, true)
                    } else {
                        logger.info('mentee do not like mentor')
                        cb(null, false)
                    }
                })
                .catch(err => cb(err))
        }
    ], (err, results) => {
        if (err) {
            logger.error('failed getting mentor details')
            logger.error(err)
            res.status(400).end()
        }
        logger.info('mentor details got successfully')
        logger.info(results)
        res.json(results)
    })
    
}

exports.getMentorsBySearchKeyword = async (req, res) => {
    logger.info('GET /api/mentor/search');
    let keyword, startIdx, num

    keyword = req.query.keyword 
    startIdx = req.query.startIdx 
    num = req.query.num
    if (keyword === undefined ||
        startIdx === undefined ||
        num === undefined) {
        logger.info('isufficient query data received : ', req.query)
        res.statusMessage = 'invalid query parameters'
        res.status(400).end()
    }

    logger.info('keyword: ' + keyword + ' , startIdx: ' + startIdx + ' , num: ' + num)
    await mentorService.getMentorsBySearchKeyword(keyword, startIdx, num)
        .then(mentors => {
            if(mentors === undefined) {
                logger.info('no data to GET');
                res.statusMessage = 'no user account found'
                res.status(204).end();
            } else {
                logger.info('success GET');
                logger.info(mentors.length + ' mentors found')
                res.json(mentors);
            }
        })
        .catch(err => {
            logger.error('GET /api/mentor/search');
            logger.error(err.stack);
            res.status(400).end()
        });
    
}

exports.toggleMentorSearchAllowById = async (req, res, next) => {
    logger.info('GET /api/mentor/searchAllow')
    try {
        const mentorId = req.query.mentorId;
        const curState = (req.query.curState === 'true' 
                        ? true : false);
        await mentorService.toggleMentorSearchAllowById(mentorId, curState)
            .then(mentor => {
                logger.info('toggle mentor search allow')
                res.json(mentor.searchAllow)
            })
            .catch(err => {
                logger.error('GET /api/mentor/searchAllow')
                logger.error(err.stack)
                res.status(400).end()
            })
    } catch {
        logger.info('invalid query parameters')
        res.statusMessage = 'invalid query parameters'
        res.status(400).end()
    }
}