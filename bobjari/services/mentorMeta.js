const logger = require('../config/winston');
const mentorMetaModel = require('../models/mentor/metadata/handler');

exports.updateMentorRate = async (mentorId, score) => {
    try {
        const mentorMeta = await mentorMetaModel.updateRate(mentorId, score)
        return mentorMeta
    } catch(err) {
        logger.error(err.stack)
        throw Error(err)
    }
}

exports.increaseNumBobjari = async (mentorId) => {
    try {
        const mentorMeta = await mentorMetaModel.increaseNumBobjari(mentorId)
        return mentorMeta
    } catch(err) {
        logger.error(err.stack)
        throw Error(err)
    }
}

//exports.increaseMentorNews = async (mentorId) => {}