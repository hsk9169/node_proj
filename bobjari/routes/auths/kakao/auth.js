const router = require('express').Router();
const logger = require('../../../config/winston');
const axios = require('axios');
const qs = require('qs');
const url = require('url');

const kakao = {
    clientID: 'e343c9f82222cc6cc84c721b9e869b3c',
    clientSecret: 'dRmnbLf8JJClsU7NjPWEkjKLTb4F1T6K',
    callbackURI: 'http://ec2-3-17-139-14.us-east-2.compute.amazonaws.com:8000/auth/kakao/callback',
};

let getToken = {
    tokenType: 'tokenType',
    accessToken: 'accessToken',
    expiresIn: 0,
    refreshToken: 'refreshToken',
    refreshtokenExpiresIn: 0,
    scope: 'scope',
};

let getProfile = {
    id: 0,
    connectedAt: 0,
    profileImage: '',
    email: '',
    ageRange: '',
    birthday: '',
    gender: '',
};

let result = 'fail';

router.get('/access', (req,res) => {
    logger.info('GET /auth/kakao/access');
    const kakaoAuthUri = `https://kauth.kakao.com/oauth/authorize?client_id=${kakao.clientID}&redirect_uri=${kakao.callbackURI}&response_type=code`;
    // redirect with response (accessCode)
    res.redirect(kakaoAuthUri);
});

router.get('/callback', async (req,res) => {
    const accessCode = req.query.code;
    logger.info('GET /auth/kakao/callback');
    logger.info(req.query);
    logger.info(`get user(${req.query.client_id}) accessCode : ${req.query.code}`);

    let options = {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: qs.stringify({
            grant_type: 'authorization_code',
            client_id: kakao.clientID,
            redirect_uri: kakao.callbackURI,
            code: accessCode, 
        }),
        url: 'https://kauth.kakao.com/oauth/token',
    }
    
    axios(options)
        .then(res => {
            if(res.status == 200) {
                getToken = {
                    tokenType: res.data.token_type,
                    accessToken: res.data.access_token,
                    expiresIn: res.data.expires_in,
                    refreshToken: res.data.refresh_token,
                    refreshtokenExpiresIn: res.data.refresh_token_expires_in,
                    scope: res.data.scope,
                };
                result = 'success';
                return result;
            }
        })
        .catch(err => {
            console.log(`err: ${err}`);
            result = 'failed';
            return result;
        })
        .then(() => {
            const url = `${kakao.callbackURI}/result/${result}`;
            logger.info(`accessToken : ${getToken.accessToken}`);
            res.redirect(url);
        });
});

router.get('/callback/result/success', async (req,res) => {
    logger.info('GET /auth/kakao/callback/result/success');
    let options = {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${getToken.accessToken}` },
        url: 'https://kapi.kakao.com/v2/user/me',
    };
    let result = 'fail';

    axios(options)
        .then(res => {
            if(res.status == 200) {
                getProfile = {
                    id: res.data.id,
                    connectedAt: res.data.connected_at,
                    profileImg: res.data.properties.profile_image,
                    email: res.data.kakao_account.email,
                    ageRange: res.data.kakao_account.age_range,
                    birthday: res.data.kakao_account.birthday,
                    gender: res.data.kakao_account.gender,
                };
            }
            result = 'success';
            return result;
        })
        .catch(err => {
            console.log(`err: ${err}`);
            result = 'failed';
            return result;
        })
        .then(() => {
            logger.info(`get user(${getProfile.id}) profile success`);
            res.redirect(url.format({
                pathname: '/profile',
                query: getProfile,
            }));
        });
});

module.exports = router;
