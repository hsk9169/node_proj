let mongoose = require('mongoose');
let mentorDetailsSchema = require('./schema');

mentorDetailsSchema.statics.create = function (payload) {
    const mentorDetails = new this(payload)
    return mentorDetails.save()
}

module.exports =
    mongoose.admin_conn.model('MentorDetails', mentorDetailsSchema)