let mongoose = require("mongoose");

let menteeSchema = {
    createdAt: { 
        type: Date,
        required: true,
        default: Date.now,
    },
    //lastVisited: {
    //    type: Date,
    //    required: true,
    //},
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'User must be included'],
    },
    userDetail: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    interests: [String],
};

module.exports = new mongoose.Schema(
    menteeSchema,
    {toJSON: {virtuals: true}, toObject: {virtuals: true}}
);