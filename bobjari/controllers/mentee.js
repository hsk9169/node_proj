const logger = require('../config/winston');
const url = require('url');
const menteeService = require('../services/mentee');

exports.getMenteeByIdWithMeta = async (req, res) => {
    logger.info('GET /mentee');
    const menteeId = req.query.menteeId
    await menteeService.getMenteeByIdWithMeta(menteeId)
        .then(mentee => {
            if (mentee) {
                logger.info('mentee account found : ' + menteeId);
                res.json(mentee)
            } else {
                logger.info('no mentee account found : ' + menteeId)
                res.status(200).send('no mentee found')
            }
        })
        .catch(err => {
            logger.error('GET /mentee');
            logger.error(err.stack);
            res.status(400).end()
        });
}