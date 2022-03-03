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

//exports.increaseMentorNews = async (mentorId) => {}