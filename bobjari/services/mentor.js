const logger = require('../config/winston');
const mentorModel = require('../models/mentor/handler');

exports.getMentorByEmailWithMeta = async (email) => {
    try {
        return await mentorModel.findByEmailWithMeta(email)
    } catch(err) {
        logger.error(err.stack)
        throw Error(err)
    }
}

exports.getMentorsBySearchKeyword = async (keyword, startIdx, num) => {
    try {
        let data = await mentorModel.findByKeyword(keyword, startIdx, num);
        return data;
    } catch(err) {
        logger.error(err.stack);
        throw Error(err);
    }
}