const logger = require('../config/winston');
const url = require('url');
const mentorService = require('../services/mentor');

exports.getMentorByEmailWithMeta = async (req, res) => {
    logger.info('GET /mentor/email');
    const email = req.query.email
    await mentorService.getMentorByEmailWithMeta(email)
        .then(mentor => {
            if (mentor) {
                logger.info('mentor account found : ' + email);
                res.json(mentor)
            } else {
                logger.info('no mentor account found : ' + email)
                res.status(200).send('no mentor found')
            }
        })
        .catch(err => {
            logger.error('GET /mentor/email');
            logger.error(err.stack);
            res.status(500).send();
        });
}

exports.getMentorsBySearchKeyword = async (req, res) => {
    logger.info('GET /mentor/search');
    let keyword = null, startIdx = null, num = null;
    try {keyword = req.query.keyword} catch{} 
    try {startIdx = req.query.startIdx} catch{} 
    try {num = req.query.num} catch{}
    if (keyword === undefined ||
        startIdx === undefined ||
        num === undefined) {
        logger.info('invalid query parameter')
        res.statusMessage = 'invalid query parameters'
        res.status(400).end()
    } else {
        logger.info('keyword: ' + keyword + ' , startIdx: ' + startIdx + ' , num: ' + num)
        await mentorService.getMentorsBySearchKeyword(keyword, startIdx, num)
            .then((mentors) => {
                console.log(mentors)
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
                logger.error('GET /mentor/search');
                logger.error(err.stack);
                res.status(500).send();
            });
    }
}