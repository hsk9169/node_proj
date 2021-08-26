const mongoose = require('mongoose');

// Define Scehmas
const todoSchema = new mongoose.Schema(
    {
        todoid: {
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
// Create new todo document
todoSchema.statics.create = function (payload) {
    // this === Model
    const todo = new this(payload);
    // return Promise
    return todo.save();
};

// Find All
todoSchema.statics.findAll = function () {
    // return promise
    return this.find({});
};

// Find One by todoid
todoSchema.statics.findOneByTodoid = function (todoid) {
    return this.findOne({ todoid});
};

// Update by todoid
todoSchema.statics.updateByTodoid = function (todoid, payload) {
    // {new: true }: return the modified document 
    // rather than the original. defaults to false
    return this.findOneAndUpdate({ todoid }, payload, { new: true });
};

// Delete by todoid
todoSchema.statics.deleteByTodoid = function (todoid) {
    return this.deleteOne({ todoid });
};


//------------ Custom Methods ------------//
// Find By Contents
todoSchema.methods.findByContents = function(content, cb) {
    return this.find({ contents: new RegExp(content, 'i') }, cb);
};


// Create Model & Export
module.exports = mongoose.model('Todo', todoSchema);
