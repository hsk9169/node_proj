const router = require('express').Router();
const logger = require('../config/winston');
const axios = require('axios');
const qs = require('qs');
const url = require('url');

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
        
        let token;
        await axios(options)
            .then(res => {
                if(res.status == 200) {
                    this.accessToken = res.data.access_token;
                }
            })
            .catch(err => {
                logger.error(err);
            });
    }

    async getAccount() {
        const options = {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${this.accessToken}` },
            url: 'https://kapi.kakao.com/v2/user/me',
        };

        await axios(options)
            .then(res => {
                if(res.status == 200) {
                    this.account = res.data.kakao_account;
                }
            })
            .catch(err => {
                logger.error(err);
            });
    }
}

module.exports = kakaoLogin;
