const logger = require('../config/winston')
const url = require('url')


exports.addLikeInList = (req, res) => {
    logger.info('POST /api/like')
}

exports.getLikeList = (req, res) => {
    logger.info('GET /api/like')
}