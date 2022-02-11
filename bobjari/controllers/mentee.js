const logger = require('../config/winston');
const url = require('url');
const menteeService = require('../services/mentee');

exports.getMenteeByEmailWithMeta = async (req, res) => {
    logger.info('GET /mentee/email');
    const email = req.query.email
    await menteeService.getMenteeByEmailWithMeta(email)
        .then(mentee => {
            if (mentee) {
                logger.info('mentee account found : ' + email);
                res.json(mentee)
            } else {
                logger.info('no mentee account found : ' + email)
                res.status(200).send('no mentee found')
            }
        })
        .catch(err => {
            logger.error('GET /mentee/email');
            logger.error(err.stack);
            res.status(500).send();
        });
}