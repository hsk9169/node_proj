const mongoose = require('mongoose');

// Define Scehmas
const testSchema = new mongoose.Schema(
    {
        testid: {
            type: Number,
            require: true,
            unique: true 
        },
        content: { 
            type: String,
            require: true
        },
        completed: { 
            type: String,
            defalt: false 
        }
    },
    {
        timestamps: true
    }
);


//------------ Static Properties ------------//
// Create new test document
testSchema.statics.create = function (payload) {
    // this === Model
    const test = new this(payload);
    // return Promise
    return test.save();
};

// Find All
testSchema.statics.findAll = function () {
    // return promise
    return this.find({});
};

// Find One by testid
testSchema.statics.findOneByTestid = function (testid) {
    return this.findOne({ testid });
};

// Update by testid
testSchema.statics.updateByTestid = function (testid, payload) {
    // {new: true }: return the modified document 
    // rather than the original. defaults to false
    return this.findOneAndUpdate({ testid }, payload, { new: true });
};

// Delete by testid
testSchema.statics.deleteByTestid = function (testid) {
    return this.deleteOne({ testid });
};


//------------ Custom Methods ------------//
// Find By Contents
testSchema.methods.findByContents = function(content, cb) {
    return this.find({ contents: new RegExp(content, 'i') }, cb);
};

// Find By Completed
testSchema.methods.findByCompleted = function(completed, cb) {
    return this.find({ completed: new RegExp(completed, 'i') }, cb);
};


// Create Model & Export
module.exports = mongoose.model('Test', testSchema);