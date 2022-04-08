let mongoose = require("mongoose");

let userSchema = {
    createdAt: { 
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
            unique: true,
            default: null,
        },
        phone: {
            type: String,
            unique: true,
            default: null,
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
};

module.exports = new mongoose.Schema(
    userSchema,
    {toJSON: {virtuals: true}, toObject: {virtuals: true}}
);