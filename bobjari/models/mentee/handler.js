let mongoose = require('mongoose')
let menteeSchema = require('./schema');

menteeSchema.virtual('bobjari', {
    ref: 'Bobjari',
    foreignField: 'mentee',
    localField: '_id',
})

menteeSchema.virtual('metadata', {
    ref: 'MenteeMeta',
    foreignField: 'mentee',
    localField: '_id',
    justOne: true,
})

//------------ Static Properties ------------//
// Create new mentee document
menteeSchema.statics.create = function (payload) {
    const mentee = new this(payload);
    // return Promise
    return mentee.save();
};

menteeSchema.statics.findByIdWithMeta = function (menteeId) {
    return this.findById(menteeId)
                .populate('metadata')
                .populate('userDetail')
                .exec() 
}

module.exports = 
    mongoose.admin_conn.model('Mentee', menteeSchema);