let mongoose = require("mongoose");

let userSchema = {
    updated: { 
        type: Date,
        required: true,
        default: Date.now,
    },
    role: {
        type: String,
        required: true,
    },
    profile: {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        age: {
            type: Number,
            max: 80,
            required: true,
        },
        gender: {
            type: String,
            required: true,
        },
        nickname: {
            type: String,
            required: true,
            unique: true,
        },
    },
    searchAllow: {
        type: Boolean,
        default: true,
    },
    mentee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Mentee',
    },
    mentor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Mentor'
    },
    profileImage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProfileImage'
    },
};

module.exports = new mongoose.Schema(
    userSchema, { collections: 'user' }
);