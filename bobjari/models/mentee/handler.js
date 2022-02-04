let mongoose = require('mongoose')
let menteeSchema = require('./schema');

//------------ Static Properties ------------//
// Create new mentee document
menteeSchema.statics.create = function (payload) {
    const mentee = new this(payload);
    // return Promise
    return mentee.save();
};

// Find All
menteeSchema.statics.findAll = function () {
    // return promise
    return this.find({});
};

// Find One by menteeid
menteeSchema.statics.findOneByMenteeid = function (menteeid) {
    return this.findOne({ menteeid });
};

// Update by menteeid
menteeSchema.statics.updateByMenteeid = function (menteeid, payload) {
    // {new: true }: return the modified document 
    // rather than the original. defaults to false
    return this.findOneAndUpdate({ menteeid }, payload, { new: true });
};

// Delete by menteeid
menteeSchema.statics.deleteByMenteeid = function (menteeid) {
    return this.deleteOne({ menteeid });
};

// Find By mentee email
menteeSchema.statics.findOneByEmail = function(target, cb) {
    const query = new RegExp('^'+target+'$', 'i');
    return this.findOne( { 'userInfo.email': query } ).exec();
};

// Update mentor role by swapping
menteeSchema.statics.findOneByEmailAndUpdateRole = function(target, curState) {
    const query = new RegExp('^'+target+'$', 'i');
    return this.findOneAndUpdate( 
        { 'userInfo.email': query }, {'roleInfo.isActivated': !curState} 
        ).exec();
}

// Find By mentee phone number
menteeSchema.statics.findOneByPhone = function(target, cb) {
    const query = new RegExp('^'+target+'$', 'i');
    return this.findOne( { 'userInfo.phone': query } ).exec();
};

// Find By mentee nickname
menteeSchema.statics.findOneByNickname = function (target) {
    const query = new RegExp('^'+target+'$', 'i');
    return this.findOne( { 'userInfo.nickname': query } ).exec();
};

module.exports = 
    mongoose.admin_conn.model('Mentee', menteeSchema);