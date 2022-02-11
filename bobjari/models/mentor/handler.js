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

//------------ Static Properties ------------//
// Create new mentor document
mentorSchema.statics.create = function (payload) {
    // this === Model
    const mentor = new this(payload);
    // return Promise
    return mentor.save();
};

// Get Mentor User Data with Bobjari
mentorSchema.statics.findByIdWithMeta = function (mentorId) {
    return this.findById(mentorId)
                .populate('details')
                .populate('user')
                .exec()
}

// Find By Keyword
mentorSchema.statics.findByKeyword = function(keyword, startIdx, num) {
    const query = new RegExp(keyword, 'i');
    return this.find( {'career.job': query} )
                .skip(Number(startIdx))
                .limit(Number(num))
                .populate({
                    path:'user',
                    match: { searchAllow: true }
                })
                .exec();
};


// Create Model & Export
module.exports = 
    mongoose.admin_conn.model('Mentor', mentorSchema);