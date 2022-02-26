const logger = require('../config/winston');
const chatService = require('../services/chat');

exports.getMessagesByDateWithStep = async (req, res) => {
    logger.info('GET /api/chat')
    console.log(req.query)
    let bobjariId, startIdx, num
    
    bobjariId = req.query.bobjariId
    startIdx = req.query.startIdx
    num = req.query.num
    if (bobjariId === undefined || 
        startIdx === undefined || 
        num === undefined) {
        logger.warn('insufficient query data received : ', req.query)
        res.statusMessage = 'invalid query parameters'
        res.status(400).end()
    }

    await chatService.getMessagesByDateWithStep(bobjariId, startIdx, num)
        .then(chatArray => {
            logger.info('chat array found successfully!')
            console.log(chatArray)
            res.json(chatArray)
        })
        .catch(err => {
            logger.error('GET /api/chat')
            logger.error(err.stack)
            res.status(500).send()
        })
}