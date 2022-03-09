let mongoose = require('mongoose');
let mentorSchema = require('./schema');

mentorSchema.virtual('bobjari', {
    ref: 'Bobjari',
    foreignField: 'mentor',
    localField: '_id',
})

mentorSchema.virtual('metadata', {
    ref: 'MentorMeta',
    foreignField: 'mentor',
    localField: '_id',
    justOne: true,
})

mentorSchema.virtual('details', {
    ref: 'MentorDetails',
    foreignField: 'mentor',
    localField: '_id',
    justOne: true,
})

mentorSchema.virtual('review', {
    ref: 'Review',
    foreignField: 'mentor',
    localField: '_id',
})

//------------ Static Properties ------------//
// Create new mentor document
mentorSchema.statics.create = function (payload) {
    // this === Model
    const mentor = new this(payload);
    // return Promise
    return mentor.save();
};

// Get Mentor User Data
mentorSchema.statics.findByIdWithDetails = function (mentorId) {
    return this.findById(mentorId)
                .populate('details')
                .populate('user')
                .populate({
                    path: 'metadata',
                    select: 'numBobjari rate'
                })
                .populate({
                    path: 'review',
                    options: {limit: 5},
                    populate: {
                        path: 'mentee',
                        populate: {
                            path: 'user',
                            select: 'profile.nickname profile.image',
                        }
                    }
                })
                .exec()
}

// Find By Keyword
mentorSchema.statics.findByKeyword = function (keyword, startIdx, num) {
    const query = new RegExp(keyword, 'i');
    return this.find( {'searchAllow': true,
                       'career.job': query} )
                .skip(Number(startIdx))
                .limit(Number(num))
                .populate({
                    path: 'details',
                    select: 'preference.fee',
                })
                .populate('user')
                .exec();
};

// Toggle Search Allow Flag
mentorSchema.statics.toggleSearchAllowById = function (mentorId, curState) {
    return this.findByIdAndUpdate(
                    mentorId,
                    {'searchAllow': !curState},
                    {new: true},
                )
                .exec()
}


// Create Model & Export
module.exports = 
    mongoose.admin_conn.model('Mentor', mentorSchema);