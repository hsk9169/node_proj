const logger = require('../config/winston');
const likeModel = require('../models/like/handler');

exports.createLike = async (menteeId, mentorId) => {
    try {
        const like = await likeModel.create({
            mentee: menteeId,
            mentor: mentorId,
        })
        return like
    } catch(err) {
        logger.error(err.stack)
        throw Error(err)
    }
}

exports.getLikeByMenteeId = async (menteeId) => {
    try {
        return await likeModel.findByMenteeId(menteeId)
    } catch(err) {
        logger.error(err.stack)
        throw Error(err)
    }
}

exports.checkLikeByMenteeMentorId = async (menteeId, mentorId) => {
    try {
        return await likeModel.checkByMenteeMentorId(menteeId, mentorId)
    } catch(err) {
        logger.error(err.stack)
        throw Error(err)
    }
}

exports.deleteLike = async (menteeId, mentorId) => {
    try {
        return await likeModel.removeByMenteeMentorId(menteeId, mentorId)
    } catch(err) {
        logger.error(err.stack)
        throw Error(err)
    }
}