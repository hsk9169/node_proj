const logger = require('../config/winston');
const kakaoAuth = require('../subscribers/auth');

exports.authKakao = async (authData) => {
    const accessToken = await kakaoAuth.getAccessToken(authData);
    console.log('accessToken', accessToken);
    const account = await kakaoAuth.getAccount(accessToken);
    console.log('account', account);
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