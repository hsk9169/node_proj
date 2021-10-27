const jwt = require('jsonwebtoken');
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
    let token = {accessToken: '', refreshToken: ''};
    //const payload = JSON.stringify({ email: profile.email});
    if (profile.email) {
        console.log('enter tokening');
        jwt.sign({ email: profile.email}, 'shhhhh', 
                 { expiresIn: 60}, function (err, token) {
                    token.accessToken = token;
        });
        jwt.sign({ email: profile.email}, 'shhhhh', 
                 { expiresIn: 600}, function (err, token) {
                    token.refreshToken = token;
        });
    };
    //else if (profile.phone) {
    //    token.accessToken = jwt.sign({ phone: profile.phone, password: profile.password }, 
    //            //privateKey, { algorithm: 'RS256', expiresIn: '1m'});
    //            'secret', { expiresIn: '1m'});
    //    token.refreshToken = jwt.sign({ email: profile.email, password: profile.password }, 
    //            //refreshKey, { algorithm: 'RS256', expiresIn: '7d'});
    //            'secret', { expiresIn: '10m'});
    //    console.log(token);
    //};
    while(!token.accessToken || !token.refreshToken){};
    return token;
}