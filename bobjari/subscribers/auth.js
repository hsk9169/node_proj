const router = require('express').Router();
const logger = require('../config/winston');
const axios = require('axios');
const qs = require('qs');
const url = require('url');
const { resolve } = require('path/posix');

class kakaoLogin {
    constructor(apiConfig) {
        this.clientID = apiConfig.clientID;
        this.clientSecret = apiConfig.clientSecret;
        this.callbackURI = apiConfig.callbackURI;
    }

    makeAuthUri() {
        let  baseUri = 'https://kauth.kakao.com/oauth/authorize?';
        baseUri = baseUri.concat('client_id=', this.clientID, '&');
        baseUri = baseUri.concat('client_secret=', this.clientSecret, '&');
        baseUri = baseUri.concat('redirect_uri=', this.callbackURI, '&');
        baseUri = baseUri.concat('response_type=', 'code');
        return baseUri;
    }

    getAuthUri() {
        return this.makeAuthUri();
    }

    setAccessToken(token) {
        this.accessToken = token;
    }

    async getAccessToken(accessCode) {
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify({
                grant_type: 'authorization_code',
                client_id: this.clientID,
                redirect_uri: this.callbackURI,
                code: accessCode, 
                client_secret: this.clientSecret,
            }),
            url: 'https://kauth.kakao.com/oauth/token',
        };

        await axios(options)
            .then(res => {
                if(res.status == 200) {
                    console.log(res.data.access_token);
                    return res.data.access_token;
                }
            })
            .catch(err => {
                //logger.error(err);
                return err;
            });
    }

    async getProfile(token) {
        const options = {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` },
            url: 'https://kapi.kakao.com/v2/user/me',
        };

        await axios(options)
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
                //logger.error(err);
                return err;
            });
    }
}

module.exports = kakaoLogin;
