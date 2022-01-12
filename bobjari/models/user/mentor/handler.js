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
    mentorId: 1,
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
    return this.find( { 'careerInfo.company': query } )
               .where('mentorId')
               .gte(startIdx)
               .lt(startIdx + num)
               .exec()
};

// Find One by mentorid
mentorModel.statics.findOneByMentorid = function (mentorid) {
    return this.findOne({ mentorid });
};

// Update by mentorid
mentorModel.statics.updateByMentorid = function (mentorid, payload) {
    // {new: true }: return the modified document 
    // rather than the original. defaults to false
    return this.findOneAndUpdate({ mentorid }, payload, { new: true });
};

// Delete by mentorid
mentorModel.statics.deleteByMentorid = function (mentorid) {
    return this.deleteOne({ mentorid });
};

// Find By mentor email
mentorModel.statics.findOneByEmail = function(target, cb) {
    const query = new RegExp('^'+target+'$', 'i');
    return this.findOne( { 'userInfo.email': query } ).exec();
};

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

// Create Model & Export
module.exports = mongoose.model('Mentor', mentorModel);