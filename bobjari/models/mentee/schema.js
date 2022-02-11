let mongoose = require("mongoose");

let menteeSchema = {
    updated: { 
        type: Date,
        required: true,
        default: Date.now,
    },
    //lastVisited: {
    //    type: Date,
    //    required: true,
    //},
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User must be included'],
    },
    interests: [String],
};

module.exports = new mongoose.Schema(
    menteeSchema,
    {toJSON: {virtuals: true}, toObject: {virtuals: true}}
);