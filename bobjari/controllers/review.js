const logger = require('../config/winston');
const reviewService = require('../services/review');
const mentorMetaService = require('../services/mentorMeta')
const parallel = require('async/parallel')

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

    parallel([
        (cb) => {
            reviewService.createReview(menteeId, mentorId, score, text)
                .then(review => {
                    logger.info('review created successfully')
                    cb(null, review)
                })
                .catch(err => cb(err))
        },
        (cb) => {
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
        } else {
            logger.info('review created successfully')
            logger.info(results)
            res.status(200).send('success')
        }
    })
}

exports.getRecentReviews = async (req, res) => {
    logger.info('GET /api/review/recent')
    let num
    try {
        num = req.query.num
    } catch {
        logger.warn('insufficient query data received : ', req.query)
        res.statusMessage = 'invalid query data'
        res.status(400).end()
    }
    await reviewService.getRecentReviews(num)
        .then(reviews => {
            logger.info('review list found successfully')
            res.json(reviews)
        })
        .catch(err => {
            logger.error('GET /api/review/recent')
            logger.error(err.stack)
            res.status(400).end()
        })
}