const router = require('express').Router();
const logger = require('../../../config/winston');
const axios = require('axios');
const qs = require('qs');
const url = require('url');

class kakaoLogin {
    constructor(apiConfig) {
        this.clientID = apiConfig.clientID;
        this.clientSecret = apiConfig.clientSecret;
        this.callbackURI = apiConfig.callbackURI;
    }

    get getAuthUri() {
        return this.makeAuthUri();
    }

    makeAuthUri() {
        const  baseUri = 'https://kauth.kakao.com/oauth/authorize?';
        baseUri.concat('client_id=', this.clientID, '&');
        baseUri.concat('client_secret=', this.clientSecret, '&');
        baseUri.concat('redirect_uri=', this.callbackURI, '&');
        baseUri.concat('response_type=', 'code');
        return baseUri;
    }

    getAccessToken() {
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify({
                grant_type: 'authorization_code',
                client_id: kakao.clientID,
                redirect_uri: kakao.callbackURI,
                code: accessCode, 
            }),
            url: 'https://kauth.kakao.com/oauth/token',
        };

        axios(options)
            .then(res => {
                if(res.status == 200) {
                    const getToken = {
                        tokenType: res.data.token_type,
                        accessToken: res.data.access_token,
                        expiresIn: res.data.expires_in,
                        refreshToken: res.data.refresh_token,
                        refreshtokenExpiresIn: res.data.refresh_token_expires_in,
                        scope: res.data.scope,
                    };
                    return getToken;
                }
            })
            .catch(err => {
                logger.info.error(err);
                return err;
            });
    }

    getProfile() {
        const options = {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${this.accessToken}` },
            url: 'https://kapi.kakao.com/v2/user/me',
        };

        axios(options)
        .then(res => {
            if(res.status == 200) {
                const getProfile = {
                    id: res.data.id,
                    connectedAt: res.data.connected_at,
                    profileImg: res.data.properties.profile_image,
                    email: res.data.kakao_account.email,
                    ageRange: res.data.kakao_account.age_range,
                    birthday: res.data.kakao_account.birthday,
                    gender: res.data.kakao_account.gender,
                };
                return getProfile;
            }
        })
        .catch(err => {
            logger.info.error(err);
            return err;
        });
    }
}


module.exports = kakaoLogin;
