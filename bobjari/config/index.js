require('dotenv').config();

const config = {
    port: process.env.PORT,
    mongo_uri: process.env.MONGO_URI,
    auth: {
        kakao: {
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURI: process.env.CALLBACK_URI,
        }
    }
}

module.exports = config;