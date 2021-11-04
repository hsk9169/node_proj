const mongoose = require('mongoose');
const userSchema = require('./schema');
const assert = require('assert')

const userModel = new mongoose.Schema(userSchema);

//------------ Static Properties ------------//
// Create new user document
userModel.statics.create = function (payload) {
    // this === Model
    const user = new this(payload);
    // return Promise
    return user.save();
};

// Find All
userModel.statics.findAll = function () {
    // return promise
    return this.find({});
};

// Find One by userid
userModel.statics.findOneByUserid = function (userid) {
    return this.findOne({ userid });
};

// Update by userid
userModel.statics.updateByUserid = function (userid, payload) {
    // {new: true }: return the modified document 
    // rather than the original. defaults to false
    return this.findOneAndUpdate({ userid }, payload, { new: true });
};

// Delete by userid
userModel.statics.deleteByUserid = function (userid) {
    return this.deleteOne({ userid });
};

// Find By user email
userModel.statics.findOneByEmail = function(target, cb) {
    const query = new RegExp('^'+target+'$', 'i');
    return this.findOne({ email: query }).exec();
};

// Find By user phone number
userModel.statics.findOneByPhone = function(target, cb) {
    const query = new RegExp('^'+target+'$', 'i');
    return this.findOne({ phone: query }).exec();
};

// Find By user nickname
userModel.statics.findOneByNickname = function (target) {
    const query = new RegExp('^'+target+'$', 'i');
    return this.findOne({ nickname: query }).exec();
};

// Create Model & Export
module.exports = mongoose.model('User', userModel);