const mongoose = require('mongoose');

// Define Scehmas
const userSchema = new mongoose.Schema(
    {
        userid: {
            type: Number,
            required: true,
            unique: true ,
        },
        updated: { 
            type: Date,
            required: true,
            default: Date.now,
        },
        email: { 
            type: String,
            required: true,
        },
        age: {
            type: Number,
            required: true,
            max: 80,
        },
        gender: {
            type: String,
            required: true,
        },
        userId: {
            type: String,
            required: true,
        },
        userPwd: {
            type: String,
            required: true,
        },
        profileImg: Buffer,
        profileImgType: String,
        mbti: String,
    },
    {
        timestamps: true
    }
);


//------------ Static Properties ------------//
// Create new user document
userSchema.statics.create = function (payload) {
    // this === Model
    const user = new this(payload);
    // return Promise
    return user.save();
};

// Find All
userSchema.statics.findAll = function () {
    // return promise
    return this.find({});
};

// Find One by userid
userSchema.statics.findOneByUserid = function (userid) {
    return this.findOne({ userid });
};

// Update by userid
userSchema.statics.updateByUserid = function (userid, payload) {
    // {new: true }: return the modified document 
    // rather than the original. defaults to false
    return this.findOneAndUpdate({ userid }, payload, { new: true });
};

// Delete by userid
userSchema.statics.deleteByUserid = function (userid) {
    return this.deleteOne({ userid });
};


//------------ Custom Methods ------------//
// Find By Contents
userSchema.methods.findByContents = function(content, cb) {
    return this.find({ contents: new RegExp(content, 'i') }, cb);
};

// Find By Completed
userSchema.methods.findByCompleted = function(completed, cb) {
    return this.find({ completed: new RegExp(completed, 'i') }, cb);
};


// Create Model & Export
module.exports = mongoose.model('User', userSchema);
