 
// Define Scehmas
const userSchema = {
    updated: { 
        type: Date,
        required: true,
        default: Date.now,
    },
    userInfo: {
        email: String,
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
        data: Buffer,
        contentType: String,
    },
};

module.exports = userSchema;