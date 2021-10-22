
// Define Scehmas
const userSchema = {
    //userid: {
    //    type: Number,
    //    required: true,
    //    unique: true,
    //},
    updated: { 
        type: Date,
        required: true,
        default: Date.now,
    },
    email: { 
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
        max: 80,
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
    password: {
        type: String,
        required: true,
    },
    profileImg: Buffer,
    // Type: URI, *.png, *.jpg ...
    profileImgType: String,
    mbti: String,
};

module.exports = userSchema;