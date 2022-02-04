const mongoose = require("mongoose");
const preferenceSchema = require('../preference/schema')

const mentorSchema = {
    updated: { 
        type: Date,
        required: true,
        default: Date.now,
    },
    lastVisited: {
        type: Date,
        required: true,
    },
    career: {
        job: [String],
        company: [String],
        years: Number,
        topics: [Number],
        auth: {
            method: String,
            isAuth: Boolean,
            file: {
                data: mongoose.Schema.Types.Mixed,
                contentType: String,
            },
        },
        title: {
            type: String,
            maxLength: 30,
        },
        introduce: {
            type: String,
            maxLength: 300,
        },
        hashtags: [String],
    },
    preference: preferenceSchema,
};

module.exports = new mongoose.Schema(
    mentorSchema, { collection: 'mentorinfo'} 
);
