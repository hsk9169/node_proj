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
    jwt_secret_key: process.env.JWT_SECRET_KEY,
    telegram: {
        uri: process.env.TELEGRAM_URI,
        chatId: process.env.TELEGRAM_CHAT_ID,
    },
    socket_port: process.env.SOCKET_PORT,
    ncp_sens: {
        secretKey: process.env.NCP_SECRET_KEY,
        accessKey: process.env.NCP_KEY,
        baseUrl: process.env.NCP_SENS_BASE_URL,
        servicePath: process.env.NCP_SENS_SERVICE_PATH
                    + process.env.NCP_SENS_SERVICE_ID + '/messages',
    }
}

module.exports = config;