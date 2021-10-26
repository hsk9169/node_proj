const mongoose = require('mongoose');
const userSchema = require('./schema');

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
userModel.statics.findOneByEmail = function(email, cb) {
    return this.findOne({ email: new RegExp(email, 'i') }, cb);
};

// Find By user phone number
userModel.statics.findOneByPhone = function(phone, cb) {
    return this.findOne({ phone: new RegExp(phone, 'i') }, cb);
};

// Find By user nickname
userModel.statics.findOneByNickname = function(nickname, cb) {
    return this.findOne({ nickname: new RegExp(nickname, 'i') }, cb);
};

// Create Model & Export
module.exports = mongoose.model('User', userModel);
