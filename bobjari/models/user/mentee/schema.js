const { Schema } = require("mongoose");

 
// Define Scehmas
const menteeSchema = {
    updated: { 
        type: Date,
        required: true,
        default: Date.now,
    },
    userInfo: {
        email: {
            type: String,
            unique: true,
        },
        age: {
            type: Number,
            max: 80,
        },
        gender: String,
        nickname: {
            type: String,
            unique: true,
        },
    },
    role: Boolean,
    interests: [String],
    profileImg: {
        data: Schema.Types.Mixed,
        contentType: String,
    },
};

module.exports = menteeSchema;