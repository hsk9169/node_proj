const router = require('express').Router();
const axios = require('axios');
const qs = require('qs');
const url = require('url');
const logger = require('../config/winston');

exports.getAccessToken = async (authData) => {
    let accessToken;
    const options = {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: qs.stringify({
            grant_type: 'authorization_code',
            client_id: authData.client_id,
            redirect_uri: authData.redirect_uri,
            code: authData.access_code, 
            client_secret: authData.secret_key,
        }),
        url: 'https://kauth.kakao.com/oauth/token',
    };

    await axios(options)
        .then(res => {
            if(res.status == 200) {
                logger.info('got access token');
                accessToken = res.data.access_token;
            }
        })
        .catch(err => {
            logger.error(err);
        });
        
    return accessToken;
};

exports.getAccount = async (accessToken) => {
    console.log('subscriber', accessToken);
    let profile;
    const options = {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${accessToken}` },
        url: 'https://kapi.kakao.com/v2/user/me',
    };

    await axios(options)
        .then(res => {
            if(res.status == 200) {
                profile = res.data.kakao_account; 
                return profile;
            }
        })
        .catch(err => {
            logger.error(err);
        });
};

/*
class kakaoLogin {
    constructor() {

    }

    setProfile(profile) {
        this.profile = profile;
    }

    async authKakao(authData) {
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify({
                grant_type: 'authorization_code',
                client_id: authData.client_id,
                redirect_uri: authData.redirect_uri,
                code: authData.access_code, 
                client_secret: authData.secret_key,
            }),
            url: 'https://kauth.kakao.com/oauth/token',
        };
        
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
*/