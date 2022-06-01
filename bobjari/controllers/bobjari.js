const logger = require('../config/winston');
const url = require('url');
const bobjariService = require('../services/bobjari');
const imgLoader = require('../middlewares/imgLoader');
const multer = require('multer');
const { read } = require('../config/winston');

exports.createBobjari = async (req, res) => {
    logger.info('POST /api/bobjari')
    let menteeId, mentorId, proposal
    try {
        menteeId = req.body.menteeId
        mentorId = req.body.mentorId
        proposal = JSON.parse(req.body.proposal)
    } catch {
        logger.warn('insufficient body data received : ', req.body)
        res.statusMessage = 'invalid body data'
        res.status(400).end('failed')
    }
    await bobjariService.createBobjari(menteeId, mentorId, proposal)
        .then(bobjari => {
            logger.info('bobjari created successfully')
            logger.info(bobjari)
            res.status(200).send('success')
        })
        .catch(err => {
            logger.error('POST /api/bobjari')
            logger.error(err.stack)
            res.status(400).end('failed')
        })
}

exports.getSentBobjariList = async (req, res) => {
    logger.info('GET /api/bobjari/mentee')
    let menteeId
    try {
        menteeId = req.query.menteeId
    } catch {
        logger.warn('insufficient query data received : ', req.query)
        res.statusMessage = 'invalid query data'
        res.status(400).end()
    }
    await bobjariService.getBobjariListByMenteeId(menteeId)
        .then(bobjariList => {
            logger.info('bobjari list found successfully')
            res.json(bobjariList)
        })
        .catch(err => {
            logger.error('GET /api/bobjari/mentee')
            logger.error(err.stack)
            res.status(400).end()
        })
}

exports.getReceivedBobjari = async (req, res) => {
    logger.info('GET /api/bobjari/mentor')
    let mentorId
    try {
        mentorId = req.query.mentorId
    } catch {
        logger.warn('insufficient query data received : ', req.query)
        res.statusMessage = 'invalid query data'
        res.status(400).end()
    }
    await bobjariService.getBobjariListByMentorId(mentorId)
        .then(bobjariList => {
            logger.info('bobjari list found successfully')
            res.json(bobjariList)
        })
        .catch(err => {
            logger.error('GET /api/bobjari/mentor')
            logger.error(err.stack)
            res.status(400).end()
        })
}

exports.updateBobjariLevel = async (req, res) => {
    logger.info('POST /api/bobjari/level')
    let level, bobjariId
    try {
        level = req.body.level
        bobjariId = req.body.bobjariId
    } catch {
        logger.warn('insufficient body data received : ', req,body)
        res.statusMessage = 'invalid body data'
        res.status(400).end()
    }
    await bobjariService.updateBobjariLevel(bobjariId, level)
        .then(bobjari => {
            if (bobjari.level === level) {
                logger.info('bobjari level updated successfully')
                res.json(bobjari.level)
            } else {
                logger.error('bobjari level updating failed')
                res.json(bobjari.level)
            }
        })
        .catch(err => {
            logger.error('POST /api/bobjari/level')
            logger.error(err.stack)
            res.status(400).end()
        })
}

exports.removeBobjariById = async (req, res) => {
    logger.info('DELETE /api/bobjari')
    let bobjariId
    try {
        bobjariId = req.body.bobjariId
    } catch {
        logger.warn('insufficient body data received : ', req.body)
        res.statusMessage = 'invalid body data'
        res.status(400).end()
    }
    await bobjariService.removeBobjariById(bobjariId)
        .then(result => {
            logger.info('bobjari removed successfully')
            res.status(200).send('success')
        })
        .catch(err => {
            logger.error('DELETE /api/bobjari')
            logger.error(err.stack)
            res.status(400).end()
        })
}