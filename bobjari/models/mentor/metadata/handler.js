let mongoose = require('mongoose')
let mentorMetaSchema = require('./schema')

mentorMetaSchema.statics.create = function (payload) {
    const mentorMeta = new this(payload)
    return mentorMeta.save()
}

mentorMetaSchema.statics.updateRate = function (mentorId, score) {
    return this.findOneAndUpdate({'mentor': mentorId},
                                {$inc: 
                                    {'rate.score': score,
                                     'rate.num': 1}
                                }, {new: true})
                                .exec()
}

module.exports =
    mongoose.admin_conn.model('MentorMeta', mentorMetaSchema)