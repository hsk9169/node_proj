const logger = require('../config/winston');
const mentorModel = require('../models/mentor/handler');

exports.getMentorByIdWithDetails = async (mentorId) => {
    try {
        return await mentorModel.findByIdWithDetails(mentorId)
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

exports.getMentorRecommended = async (num) => {
    try {
        return await mentorModel.findRecommended(num)
    } catch(err) {
        logger.error(err.stack)
        throw Error(err)
    }
}

exports.toggleMentorSearchAllowById = async (mentorId, curState) => {
    try {
        return await mentorModel.toggleSearchAllowById(mentorId, curState)  
    } catch(err) {
        logger.error(err.stack);
        throw Error(err);
    }
}