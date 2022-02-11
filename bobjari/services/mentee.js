const logger = require('../config/winston');
const menteeModel = require('../models/mentee/handler');

exports.getMenteeByEmailWithMeta = async (email) => {
    try {
        return await menteeModel.findByEmailWithMeta(email)
    } catch(err) {
        logger.error(err.stack)
        throw Error(err)
    }
}