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
    console.log(`accessCode: ${accessCode}`);
    token = await kakao.getAccessToken(accessCode);
    await kakao.setAccessToken(token);
    const getProfileUri = `${kakao.callbackURI}/profile`;
    return getProfileUri;
}

exports.loginKakaoGetProfile = async() => {
    const profile = await kakao.getProfile();
    return profile;
}