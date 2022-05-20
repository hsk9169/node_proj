const mongoose = require("mongoose");

const mentorSchema = {
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
    career: {
        job: {
            type: String,
            default: null,
        },
        company: {
            type: String,
            default: null,
        },
        years: {
            type: Number,
            default: null,
        },
        topics: [Number],
        auth: {
            method: {
                type: String,
                default: null,
            },
            isAuth: {
                type: Boolean,
                default: false,
            },
        },
    },
    title: {
        type: String,
        maxLength: 30,
        default: null,
    },
    hashtags: [String],
    searchAllow: {
        type: Boolean,
        default: true,
    },
};

module.exports = new mongoose.Schema(
    mentorSchema, 
    {toJSON: {virtuals: true}, toObject: {virtuals: true}}
);
