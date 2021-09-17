const logger = require('../config/winston');
const  kakaoLogin = require('../subscribers/auth');
const config = require('../config/index');

let kakao = new kakaoLogin(config.auth.kakao);

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
    await kakao.getAccount();
    const profile = {
        email: kakao.account.email,
        gender: kakao.account.gender,
        age: kakao.account.age_range,
        profileImage: kakao.account.profile.profile_image_url,
    }
    const ageRange = profile.age.split("~");
    const age = Math.round((Number(ageRange[0]) + Number(ageRange[1])) / 2);
    profile.age = age;
    return profile;
}