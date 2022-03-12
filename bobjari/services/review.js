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

exports.getRecentReviews = async (num) => {
    try {
        return await reviewModel.findRecent(num)
    } catch(err) {
        logger.error(err.stack)
        throw Error(err)
    }
}