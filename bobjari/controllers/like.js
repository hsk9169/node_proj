const logger = require('../config/winston')
const url = require('url')
const likeService = require('../services/like');

exports.createLike = async (req, res) => {
    logger.info('POST /api/like')
    console.log(req.body.menteeId)
    let menteeId, mentorId
    try {
        menteeId = req.body.menteeId
        mentorId = req.body.mentorId
    } catch {
        logger.warn('insufficient body data received : ', req.body)
        res.statusMessage = 'invalid body data'
        res.status(400).end()
    }
    await likeService.createLike(menteeId, mentorId)
        .then(like => {
            logger.info('like created successfully')
            logger.info(like)
            res.status(200).send('success')
        })
        .catch(err => {
            logger.error('POST /api/like')
            logger.error(err.stack)
            res.status(400).end()
        })
}

exports.getLikeByMenteeId = async (req, res) => {
    logger.info('GET /api/like')
    let menteeId
    try {
        menteeId = req.query.menteeId
    } catch {
        logger.warn('insufficient query data received : ', req.query)
        res.statusMessage = 'invalid query data'
        res.status(400).end()
    }
    await likeService.getLikeByMenteeId(menteeId)
        .then(likeList => {
            logger.info('like list found successfully')
            logger.info(likeList)
            res.json(likeList)
        })
        .catch(err => {
            logger.error('GET /api/like')
            logger.error(err.stack)
            res.status(400).end()
        })
}

exports.deleteLike = async (req, res) => {
    logger.info('DELETE /api/like')
    let menteeId, mentorId
    try {
        menteeId = req.body.menteeId
        mentorId = req.body.mentorId
    } catch {
        logger.warn('insufficient body data received : ', req.body)
        res.statusMessage = 'invalid body data'
        res.status(400).end()
    }
    await likeService.deleteLike(menteeId, mentorId)
        .then(ret => {
            console.log(ret)
            if (ret) {
                logger.info('like deleted successfully')
            } else {
                logger.info('no like to delete')
            }
            res.json(ret.deletedCount)
        })
        .catch(err => {
            logger.error('DELETE /api/like')
            logger.error(err.stack)
            res.status(400).end()
        })
}