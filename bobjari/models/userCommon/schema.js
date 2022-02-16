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
        image: {
            data: {
                type: mongoose.Schema.Types.Mixed,
                required: true,
            },
            contentType: {
                type: String,
                required: true,
            },
        }
    },
    searchAllow: {
        type: Boolean,
        default: true,
    },
};

module.exports = new mongoose.Schema(
    userSchema,
    {toJSON: {virtuals: true}, toObject: {virtuals: true}}
);