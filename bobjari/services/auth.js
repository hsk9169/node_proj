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
    console.log(kakao.clientID);
    const uri = kakao.getAuthUri();
    console.log(uri);
    return uri;
}

exports.loginKakaoCallback = async (accessCode) => {
    const token = kakao.getAccessToken(accessCode)
    console.log(token);
    const getProfileUri = `${kakao.callbackURI}/profile`;
    return getProfileUri;
}

exports.loginKakaoGetProfile = async() => {
    profile = kakao.getProfile()
    console.log(profile);
    return profile;
}