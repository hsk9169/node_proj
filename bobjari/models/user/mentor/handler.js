const mongoose = require('mongoose');
const mentorSchema = require('./schema');
const assert = require('assert')

const mentorModel = new mongoose.Schema(
                        mentorSchema, {
                            collection: 'mentorinfos',
                        });

// Set arrangement of schema's elements
// 1  : ascending
// -1 : descending
mentorModel.index({
    updated: 1,
})

//------------ Static Properties ------------//
// Create new mentor document
mentorModel.statics.create = function (payload) {
    // this === Model
    const mentor = new this(payload);
    // return Promise
    return mentor.save();
};

// Find All
mentorModel.statics.findAll = function (keyword, startIdx, num) {
    // return promise
    const query = new RegExp(keyword, 'i');
    return this.find( {$or: [{ 'careerInfo.company': query },
                             { 'userInfo.nickname': query }]})
               .where('searchAllow').equals(true)
               .skip(Number(startIdx))
               .limit(Number(startIdx)+Number(num))
               .exec()
};

// Find By mentor email
mentorModel.statics.findOneByEmail = function(target, cb) {
    const query = new RegExp('^'+target+'$', 'i');
    return this.findOne( { 'userInfo.email': query } ).exec();
};

// Update mentor role by swapping
mentorModel.statics.findOneByEmailAndUpdateRole = function(target, curState) {
    const query = new RegExp('^'+target+'$', 'i');
    return this.findOneAndUpdate( 
        {'userInfo.email': query }, 
        {'roleInfo.isActivated': !curState},
        {new: true}).exec();
}

// Find By mentor phone number
mentorModel.statics.findOneByPhone = function(target, cb) {
    const query = new RegExp('^'+target+'$', 'i');
    return this.findOne( { 'userInfo.phone': query } ).exec();
};

// Find By mentor nickname
mentorModel.statics.findOneByNickname = function (target) {
    const query = new RegExp('^'+target+'$', 'i');
    return this.findOne( { 'userInfo.nickname': query } ).exec();
};

// Toggle mentor search allow flag
mentorModel.statics.findOneByEmailAndToggleAllowSearch = async function(target, curState) {
    const query = new RegExp('^'+target+'$', 'i');
    return await this.findOneAndUpdate( 
        {'userInfo.email': query},
        {'searchAllow': !curState},
        {new: true}).exec();
}

// Create Model & Export
module.exports = mongoose.model('Mentor', mentorModel);