const fs = require('fs');
const jwt = require('jsonwebtoken');
const logger = require('../config/winston');
const config = require('../config')

exports.check = (req, res, next) => {
    // read the token from header or url 
    let auth = null, authArray = null, token = null;
    try {
        auth = req.headers.authorization;
        authArray = auth.split(' ');
        token = authArray[1];
    } catch {}

    // token does not exist
    if(!token) {
        logger.error('request has no token embedded in headers')
        return res.status(403).json({
            success: false,
            message: 'no token embedded'
        });
    };

    // create a promise that decodes the token
    const p = new Promise(
        (resolve, reject) => {
            //const cert = fs.readFileSync('private_key.pem');
            jwt.verify(token, config.jwt_secret_key, (err, decoded) => {
                if(err) reject(err);
                resolve(decoded);
            });
        }
    );

    // if it has failed to verify, it will return an error message
    const onError = (err) => {
        logger.info('invalid token accessed, return invalid message')
        res.status(200).send('invalid')
    };

    // process the promise
    p.then((decoded)=>{
        req.decoded = decoded;
        next();
    }).catch(onError);
}
