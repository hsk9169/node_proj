require('dotenv').config();

const config = {
    port: process.env.PORT,
    mongo_uri_admin: process.env.MONGO_URI_ADMIN,
    mongo_uri_config: process.env.MONGO_URI_CONFIG,
    auth: {
        kakao: {
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURI: process.env.CALLBACK_URI,
        },
        mail: {
            mailID: process.env.NAVER_ID,
            mailPWD: process.env.NAVER_PWD,
        }
    },
    client_server: {
        dev:  process.env.DEV_CLIENT_HOSTNAME,
        real: process.env.REAL_CLIENT_HOSTNAME,
    },
    secret: "ThIsIsSeCrEtKeYfOrEnCrYpT",
}

module.exports = config;