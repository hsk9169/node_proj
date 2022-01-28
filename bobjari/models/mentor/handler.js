let mongoose = require('mongoose');
let mentorSchema = require('./schema');
let preferenceSchema = require('../preference/schema')

preferenceSchema.pre('validate', function(next) {
    console.log('schedule', this.schedule)
    console.log('location', this.location)
    console.log('fee', this.fee)
    next();
})

//------------ Static Properties ------------//
// Create new mentor document
mentorSchema.statics.create = function (payload) {
    // this === Model
    const mentor = new this(payload);
    // return Promise
    return mentor.save();
};

// Find All
mentorSchema.statics.findAll = function (keyword, startIdx, num) {
    // return promise
    const query = new RegExp(keyword, 'i');
    return this.find( {$or: [{ 'careerInfo.company': query },
                             { 'userInfo.nickname': query }]})
               .where('searchAllow').equals(true)
               .skip(Number(startIdx))
               .limit(Number(num))
               .exec()
};

// Find By mentor email
mentorSchema.statics.findOneByEmail = function(target, cb) {
    const query = new RegExp('^'+target+'$', 'i');
    return this.findOne( { 'userInfo.email': query } ).exec();
};

// Update mentor role by swapping
mentorSchema.statics.findOneByEmailAndUpdateRole = function(target, curState) {
    const query = new RegExp('^'+target+'$', 'i');
    return this.findOneAndUpdate( 
        {'userInfo.email': query }, 
        {'roleInfo.isActivated': !curState},
        {new: true}).exec();
}

// Find By mentor phone number
mentorSchema.statics.findOneByPhone = function(target, cb) {
    const query = new RegExp('^'+target+'$', 'i');
    return this.findOne( { 'userInfo.phone': query } ).exec();
};

// Find By mentor nickname
mentorSchema.statics.findOneByNickname = function (target) {
    const query = new RegExp('^'+target+'$', 'i');
    return this.findOne( { 'userInfo.nickname': query } ).exec();
};

// Toggle mentor search allow flag
mentorSchema.statics.findOneByEmailAndToggleAllowSearch = async function(target, curState) {
    const query = new RegExp('^'+target+'$', 'i');
    return await this.findOneAndUpdate( 
        {'userInfo.email': query},
        {'searchAllow': !curState},
        {new: true}).exec();
}

// Create Model & Export
module.exports = 
    mongoose.config_conn.model('Mentor', mentorSchema);