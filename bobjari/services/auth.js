const jwt = require('jsonwebtoken');
const logger = require('../config/winston');
const authSubscriber = require('../subscribers/auth');
const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

const appDir = path.dirname(require.main.filename);
const config = require('../config/index');

const makeAuthNum = () => {
    const authNum = Math.random().toString().substr(2,6);
    return authNum;
};

exports.authKakao = async (authData) => {
    const accessToken = await authSubscriber.getKakaoAccessToken(authData);
    const account = await authSubscriber.getKakaoAccount(accessToken);
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

exports.authEmail = async (email) => {
    const authNum = makeAuthNum();
    let emailTemplate;
    /*
    ejs.renderFile(appDir + '/templates/authMail.ejs',
                    {authCode: authNum}, (err, data) => {
                        if(err){console.log(err)}
                        emailTemplate = data;
                    });
    console.log(config.auth.mail)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: config.auth.mail.mailID,
            pass: config.auth.mail.mailPWD
        },
    });

    const mailOptions = await transporter.sendMail({
        from: config.auth.mail.mailID,
        to: email,
        subject: '밥자리 서비스 로그인을 위한 인증번호를 입력해주세요.',
        html: emailTemplate,
    });

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
        }
        console.log('Sending Email Success!');
        transporter.close();
    })
    */

    return authNum;
}

exports.authPhone = async (phone) => {
    const authNum = makeAuthNum()
    const authResult = await authSubscriber.getNcpSmsAuth(phone, authNum)
    const result = {
        authNum: authNum,
        authResult: authResult
    }
    return result
}

exports.authAccessToken = async (profile) => {
    //const privateKey = fs.readFileSync('private_key.pem');
    //const refreshKey = fs.readFileSync('refresh_key.pem')
    if (profile.email) {
        // Expires in 1 min
        jwt.sign({ email: profile.email}, 'shhhhh', 
                 { expiresIn: 6000}, function (err, token) {
                    return token;
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
}

exports.authRefreshToken = async (profile) => {
    //const privateKey = fs.readFileSync('private_key.pem');
    //const refreshKey = fs.readFileSync('refresh_key.pem')
    if (profile.email) {
        // Expires in 1 hour
        jwt.sign({ email: profile.email}, 'shhhhh', 
                 { expiresIn: 36000}, function (err, token) {
                    return token;
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
}

