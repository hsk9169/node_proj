const logger = require('../config/winston');
const kakaoAuth = require('../subscribers/auth');

exports.authKakao = async (authData) => {
    const accessToken = await kakaoAuth.getAccessToken(authData);
    const account = await kakaoAuth.getAccount(accessToken);
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

exports.authToken = async (profile) => {
    //const privateKey = fs.readFileSync('private_key.pem');
    //const refreshKey = fs.readFileSync('refresh_key.pem')
    console.log('authToken service', profile);
    let token = {accessToken: '', refreshToken: ''};
    //if (profile.email) {
    //    token.accessToken = jwt.sign({ email: profile.email }, 
    //            //privateKey, { algorithm: 'RS256', expiresIn: '1m'});
    //            'shhhhh', { expiresIn: '1m'});
    //    token.refreshToken = jwt.sign({ email: profile.email }, 
    //            //refreshKey, { algorithm: 'RS256', expiresIn: '7d'});
    //            'shhhhh', { expiresIn: '10m'});
    //    console.log(token);
    //} else if (profile.phone) {
    //    token.accessToken = jwt.sign({ phone: profile.phone, password: profile.password }, 
    //            //privateKey, { algorithm: 'RS256', expiresIn: '1m'});
    //            'shhhhh', { expiresIn: '1m'});
    //    token.refreshToken = jwt.sign({ email: profile.email, password: profile.password }, 
    //            //refreshKey, { algorithm: 'RS256', expiresIn: '7d'});
    //            'shhhhh', { expiresIn: '10m'});
    //    console.log(token);
    //};
    token.accessToken = profile;
    token.refreshToken = profile;
    return token;
}