const logger = require('../config/winston');
const menteeModel = require('../models/mentee/handler');

exports.getMenteeByIdWithMeta = async (menteeId) => {
    try {
        return await menteeModel.findByIdWithMeta(menteeId)
    } catch(err) {
        logger.error(err.stack)
        throw Error(err)
    }
}