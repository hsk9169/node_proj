let mongoose = require('mongoose')
let likeSchema = require('./schema')

likeSchema.statics.create = function (payload) {
    const like = new this(payload)
    return like.save()
}

likeSchema.statics.findByMenteeId = function (menteeId) {
    return this.find( {'mentee': menteeId} )
                .populate({
                    path: 'mentor',
                    select: 'career.company career.job career.years',
                    populate: [
                        {
                            path: 'user',
                            select: 'profile.nickname profile.image'
                        },
                        {
                            path: 'metadata',
                            select: 'rate'
                        },
                        {
                            path: 'details',
                            select: 'preference.fee'
                        }
                    ]
                })
                .exec()
}

likeSchema.statics.checkByMenteeMentorId = function (menteeId, mentorId) {
    return this.find({'mentee': menteeId,
                      'mentor': mentorId})
                .exec()
}

likeSchema.statics.removeByMenteeMentorId = function (menteeId, mentorId) {
    return this.deleteOne({'mentee': menteeId,
                           'mentor': mentorId})
                .exec()
}

module.exports = 
    mongoose.admin_conn.model('Like', likeSchema)