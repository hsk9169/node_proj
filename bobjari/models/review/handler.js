let mongoose = require('mongoose')
let reviewSchema = require('./schema')

reviewSchema.statics.create = function (payload) {
    const review = new this(payload)
    return review.save()
}

reviewSchema.statics.findByMentorId = function (mentorId) {
    return this.find( {'mentor': mentorId} )
                .limit(5)
                .populate({
                    path: 'mentee',
                    populate: {
                        path: 'user',
                        select: 'profile.nickname profile.image',
                    }
                })
}

module.exports = 
    mongoose.admin_conn.model('Review', reviewSchema);