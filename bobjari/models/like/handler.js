let mongoose = require('mongoose')
let likeSchema = require('./schema')

likeSchema.statics.create = function (payload) {
    const like = new this(payload)
    return like.save()
}

likeSchema.statics.findByMenteeId = function (menteeId) {
    return this.findById(menteeId)
                .populate('mentor')
}