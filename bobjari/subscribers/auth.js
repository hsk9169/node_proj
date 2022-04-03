const router = require('express').Router();
const axios = require('axios');
const qs = require('qs');
const logger = require('../config/winston');
const config = require('../config')
const crypto = require('crypto-js')

exports.getKakaoAccessToken = async (authData) => {
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

exports.getKakaoAccount = async (accessToken) => {
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
            }
        })
        .catch(err => {
            logger.error(err);
        });
        
    return profile;
};

exports.getNcpSmsAuth = async (phone, authNum) => {
    let result
    const reqUri = config.ncp_sens.baseUrl + config.ncp_sens.servicePath
    const servicePath = config.ncp_sens.servicePath
    const secretKey = config.ncp_sens.secretKey
    const accessKey = config.ncp_sens.accessKey
    const timestamp = Date.now().toString()
    const method = 'POST'
    const space = ' '
    const newLine = '\n'

    const hmac = crypto.algo.HMAC.create(crypto.algo.SHA256, secretKey)
    hmac.update(method)
    hmac.update(space)
    hmac.update(servicePath)
    hmac.update(newLine)
    hmac.update(timestamp)
    hmac.update(newLine)
    hmac.update(accessKey)
    const hash = hmac.finalize()
    const signature = hash.toString(crypto.enc.Base64)

    await axios({
        method: method,
        url: reqUri,
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'x-ncp-iam-access-key': accessKey,
            'x-ncp-apigw-timestamp': timestamp,
            'x-ncp-apigw-signature-v2': signature,
        },
        data: {
            type: "SMS",
            countryCode: "82",
            from: "01084770706",
            content: `밥자리 인증 번호 [${authNum}]를 입력해주세요.`,
            messages: [{ to: `${phone}` }],
        }
    })
        .then(res => {
            if (res.status === 200 || 
                res.status === 202)
            {
                logger.info('NCP Sens Auth succeeded')
                result = 'authorized'
            } else {
                logger.info('NCP Sens Auth failed')
                result = 'unauthorized'
            }
        })
        .catch(err => {
            console.log(err.response)
        })

    return result
}
