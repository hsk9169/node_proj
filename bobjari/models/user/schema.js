
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
    password: String,
    profileImg: Buffer,
    // Type: URI, *.png, *.jpg ...
    profileImgType: String,
    mbti: String,
};

module.exports = userSchema;