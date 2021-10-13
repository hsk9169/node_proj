const logger = require('../config/winston');
const kakaoAuth = require('../subscribers/auth');

exports.authKakao = async (authData) => {
    console.log('authData {authData}');
    const accessToken = await kakaoAuth.authKakao(authData);
    console.log('accessToken {accessToken}');
    const account = await kakaoAuth.kakaoProfile(accessToken);
    console.log('account {account}');
    const profile = {
        email: account.email,
        gender: account.gender,
        age: account.age_range,
        profileImage: account.profile.profile_image_url,
    }
    const ageRange = profile.age.split("~");
    const age = Math.round((Number(ageRange[0]) + Number(ageRange[1])) / 2);
    profile.age = age;
    return profile;
}