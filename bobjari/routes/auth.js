const router = require('express').Router();
const logger = require('../config/winston');
const axios = require('axios');
const qs = require('qs');

const kakao = {
    clientID: 'e343c9f82222cc6cc84c721b9e869b3c',
    clientSecret: 'dRmnbLf8JJClsU7NjPWEkjKLTb4F1T6K',
    callbackURI: 'http://localhost:8000/auth/kakao/callback',
};


router.get('/kakao', (req,res) => {
    const kakaoAuthUri = `https://kauth.kakao.com/oauth/authorize?client_id=${kakao.clientID}&redirect_uri=${kakao.callbackURI}&response_type=code`;
    // redirect with response (accessCode)
    res.redirect(kakaoAuthUri);
});

function linkUser(session, provider, authData) {
    let result = false;
    if (session.authData) {
        if (session.authData[provider]) {
            return result;
        }
        sesison.authData[provider] = authData;
    }else {
        session.authData = {
            [provider]: authData
        };
    }
    result = true;
    return result;
}

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
    kakaoAccount: {},
};

router.get('/kakao/callback', async (req,res) => {
    const accessCode = req.query.code;

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

    let result = 'fail';
    
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
            res.redirect(url);
        });
});

router.get('/kakao/callback/result/success', async (req,res) => {
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
                    kakaoAccount: res.data.kakao_account,
                };
                //console.log(getProfile);
                console.log(res);
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
            logger.info('get profile success');
            console.log(result);
            res.redirect('/');
        });
});

module.exports = router;
