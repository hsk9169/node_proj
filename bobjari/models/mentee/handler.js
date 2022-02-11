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

menteeSchema.statics.findByEmailWithMeta = function (email) {
    const query = new RegExp('^'+email+'$', 'i')
    return this.findOne({'profile.email': query})
                .populate({
                    path: 'mentee',
                    populate: {
                        path: 'metadata',
                    }
                })
                .exec() 
}

module.exports = 
    mongoose.admin_conn.model('Mentee', menteeSchema);