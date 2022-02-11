let mongoose = require('mongoose')
let mentorMetaSchema = require('./schema')

mentorMetaSchema.statics.create = function (payload) {
    const mentorMeta = new this(payload)
    return mentorMeta.save()
}

module.exports =
    mongoose.admin_conn.model('MentorMeta', mentorMetaSchema)