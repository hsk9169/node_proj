let mongoose = require('mongoose')
let reviewSchema = require('./schema')

reviewSchema.statics.create = function (payload) {
    const review = new this(payload)
    return review.save()
}

reviewSchema.statics.findRecent = function (num) {
    return this.find({'body': {'$ne': ''}})
                .sort({createdAt: -1})
                .limit(Number(num))
                .select('createdAt body')
                .populate({
                    path: 'mentee',
                    populate: {
                        path: 'user',
                        select: 'profile.nickname',
                    }
                })
                .populate({
                    path: 'mentor',
                    select: 'career.job',
                    populate: {
                        path: 'user',
                        select: 'profile.nickname'
                    }
                })
}

module.exports = 
    mongoose.admin_conn.model('Review', reviewSchema);