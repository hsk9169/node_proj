const { Schema } = require("mongoose");

 
// Define Scehmas
const userSchema = {
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
        role: String,
        interests: [String],
    },
    profileImg: {
        data: Schema.Types.Mixed,
        contentType: String,
    },
};

module.exports = userSchema;