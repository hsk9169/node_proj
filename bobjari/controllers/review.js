const logger = require('../config/winston');
const reviewService = require('../services/review');
const mentorMetaService = require('../services/mentorMeta')
const waterfall = require('async/waterfall')

exports.createReview = async (req, res) => {
    logger.info('POST /api/review')
    let menteeId, mentorId, score, text
    try {
        menteeId = req.body.menteeId
        mentorId = req.body.mentorId
        score = req.body.score
        text = req.body.text
    } catch {
        logger.warn('insufficient body data received : ', req.body)
        res.statusMessage = 'invalid body data'
        res.status(400).end()
    }

    waterfall([
        (cb) => {
            reviewService.createReview(menteeId, mentorId, score, text)
                .then(review => {
                    logger.info('review created successfully')
                    cb(null, review)
                })
                .catch(err => cb(err))
        },
        (review, cb) => {
            mentorMetaService.updateMentorRate(mentorId, score)
                .then(mentorMeta => {
                    logger.info('mentor rate updated successfully')
                    cb(null, mentorMeta)
                })
                .catch(err => cb(err))
        }
    ], (err, results) => {
        if (err) {
            logger.error('failed creating user')
            logger.error(err.stack)
            res.status(400).end()
        }
        logger.info('review created successfully')
        logger.info(results)
        res.status(200).send('success')
    })
}

exports.getReviewListByMentorId = async (req, res) => {
    logger.info('GET /api/review')
    let mentorId
    try {
        mentorId = req.query.mentorId
    } catch {
        logger.warn('insufficient query data received : ', req.query)
        res.statusMessage = 'invalid query data'
        res.status(400).end()
    }
    await reviewService.getReviewListByMentorId(mentorId)
        .then(reviewList => {
            logger.info('review list found successfully')
            res.json(reviewList)
        })
        .catch(err => {
            logger.error('GET /api/review')
            logger.error(err.stack)
            res.status(400).end()
        })
}