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


//------------ Custom Methods ------------//
// Find By Contents
userModel.methods.findByContents = function(content, cb) {
    return this.find({ contents: new RegExp(content, 'i') }, cb);
};

// Find By Completed
userModel.methods.findByCompleted = function(completed, cb) {
    return this.find({ completed: new RegExp(completed, 'i') }, cb);
};

// Create Model & Export
module.exports = mongoose.model('User', userModel);
