const logger = require('../config/winston');
const  kakaoLogin = require('../subscribers/auth');
require('dotenv').config();

const { CLIENT_ID, CLIENT_SECRET, CALLBACK_URI } = process.env;
const config = {
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURI: CALLBACK_URI,
};

let kakao = new kakaoLogin(config);

exports.loginKakao = async () => {
    const uri = kakao.getAuthUri();
    return uri;
}

exports.loginKakaoCallback = async (accessCode) => {
    await kakao.getAccessToken(accessCode);
    const getProfileUri = `${kakao.callbackURI}/profile`;
    return getProfileUri;
}

exports.loginKakaoGetProfile = async() => {
    await account.getAccount();
    const profile = {
        email: kakao.account.email,
        gender: kakao.account.gender,
        age: kakao.account.age_range,
        profileImage: kakao.account.profile.profile_image_url,
    }
    const ageRange = profile.age.split('~');
    const age = (ageRange[0] + ageRange[1]) / 2;
    profile.age = age;
    return profile;
}