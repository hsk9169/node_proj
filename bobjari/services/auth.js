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
    console.log(kakao.cliendID);
    const uri = kakao.getAuthUri();
    return uri;
}

exports.loginKakaoCallback = async (accessCode) => {
    kakao.getAccessToken(accessCode)
        .then(token => {
            console.log(token);
            const getProfileUri = `${kakao.callbackURI}/profile`;
            return getProfileUri;
        })
        .catch(err => {
            logger.error(err);
            return err;
        });
}

exports.loginKakaoGetProfile = async() => {
    kakao.getProfile()
        .then(profile => {
            console.log(profile);
            return profile;
        })
        .catch(err => {
            logger.error(err);
            return err;
        });
}