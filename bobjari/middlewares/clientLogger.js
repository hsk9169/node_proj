const logger = require('../config/winston');
const config = require('../config/index')

exports.getHostname = (req, res, next) => {
    const forwardedIpStr = 
        req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    let IP = null;
    console.log(forwardedIpStr)
    if (forwardedIpStr) {
        IP = forwardedIpStr.split(',')[0];
        console.log('IP address: ', IP)
    }
    const headers = req.rawHeaders;
    // create a promise that decodes the token
    const p = new Promise(
        (resolve, reject) => {
            try{  
                const parse = headers.filter(el => 
                    el === config.client_server.dev ||
                    el === config.client_server.real 
                )
                if (parse.length > 0) {
                    resolve(true)
                } else {
                    resolve(false)
                }
            } catch(err) {
                logger.error(err)
                reject(err)
            }   
        }
    );

    const onError = (err) => {
        
    }

    // process the promise
    p.then((isMine) => {
        if (!isMine) {
            logger.warn('not my front-end client server');
            logger.warn(headers);
        } else {
            logger.info('received from my front-end client server')
        }
        next();
    }).catch(onError);
}
