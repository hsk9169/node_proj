const logger = require('../config/winston');
const reviewModel = require('../models/review/handler');

exports.createReview = async (menteeId, mentorId, score, text) => {
    try {
        const review = await reviewModel.create({
            mentee: menteeId,
            mentor: mentorId,
            score: score,
            body: text,
        })
        return review
    } catch(err) {
        logger.error(err.stack)
        throw Error(err)
    }
}

exports.getReviewListByMentorId = async (mentorId) => {
    try {
        const reviewList = await reviewModel.findByMentorId(mentorId)
        return reviewList
    } catch(err) {
        logger.error(err.stack)
        throw Error(err)
    }
}