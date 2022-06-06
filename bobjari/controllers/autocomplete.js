const logger = require('../config/winston');
const url = require('url');
const autocompleteService = require('../services/autocomplete');

exports.addJobToList = async (req, res) => {
    logger.info('POST /api/autocomplete/job')
    let job
    try {
        job = req.body.job
    } catch {
        logger.warn('insufficient body data received : ', req.body)
        res.statusMessage = 'invalid body data'
        res.status(400).end('failed')
    }
    logger.info(`add job to list : ${job}`)
    await autocompleteService.addJobToList(job)
        .then(result => {
            logger.info('job name added to list successfully')
            res.status(200).send('success')
        })
        .catch(err => {
            logger.error('POST /api/autocomplete/job')
            logger.error(err.stack)
            res.status(400).end('failed')
        })
}

exports.addCorpToList = async (req, res) => {
    logger.info('POST /api/autocomplete/corp')
    let corp
    try {
        corp = req.body.corp
    } catch {
        logger.warn('insufficient body data received : ', req.body)
        res.statusMessage = 'invalid body data'
        res.status(400).end('failed')
    }
    logger.info(`add corp to list : ${corp}`)
    await autocompleteService.addCorpToList(corp)
        .then(result => {
            logger.info('corp name added to list successfully')
            res.status(200).send('success')
        })
        .catch(err => {
            logger.error('POST /api/autocomplete/corp')
            logger.error(err.stack)
            res.status(400).end('failed')
        })
}

exports.getJobList = async (req, res) => {
    logger.info('GET /api/autocomplete/job')
    let keyword, num
    try {
        keyword = req.query.keyword
        num = req.query.num
    } catch {
        logger.warn('insufficient body data received : ', req.body)
        res.statusMessage = 'invalid body data'
        res.status(400).end('failed')
    }
    logger.info(`get job list keyword : ${keyword}`)
    await autocompleteService.getJobList(keyword, num)
        .then(jobList => {
            if(jobList === undefined) {
                logger.info('no data to GET')
                res.statusMessage = 'no job name found'
                res.status(204).end()
            } else {
                logger.info('success GET')
                logger.info(jobList.length + ' jobs found')
                res.json(jobList)
            }
        })
        .catch(err => {
            logger.error('GET /api/autocomplete/job')
            logger.error(err.stack)
            res.status(400).end()
        })
}

exports.getCorpList = async (req, res) => {
    logger.info('GET /api/autocomplete/corp')
    let keyword, num
    try {
        keyword = req.query.keyword
        num = req.query.num
    } catch {
        logger.warn('insufficient body data received : ', req.body)
        res.statusMessage = 'invalid body data'
        res.status(400).end('failed')
    }
    logger.info(`get job list keyword : ${keyword}`)
    await autocompleteService.getCorpList(keyword, num)
        .then(corpList => {
            if(corpList === undefined) {
                logger.info('no data to GET')
                res.statusMessage = 'no corp name found'
                res.status(204).end()
            } else {
                logger.info('success GET')
                logger.info(corpList.length + ' corps found')
                res.json(corpList)
            }
        })
        .catch(err => {
            logger.error('GET /api/autocomplete/corp')
            logger.error(err.stack)
            res.status(400).end('failed')
        })
}